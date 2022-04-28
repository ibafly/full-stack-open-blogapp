# Notes on making blog app work with CI

Blog app is derived from what I made in full stack open part4&5, and CI is operated in Github Actions.

- Create `./.env` file from repo secrets, for `dotenv` to use:

  ```yaml
  - name: Create .env file
    run: |
      echo "TEST_MONGODB_URI = ${{secrets.TEST_MONGODB_URI}}" >> .env
  ```

  _Remember to add **double qoutes** as above._

- Config Cypress options, in my case:

  ```yaml
  - name: e2e test
    uses: cypress-io/github-action@v2
    with:
      command: yarn test:e2e -q # -q slims the output
      start: yarn start:test
      wait-on: "http://localhost:3000"
      config: video=false # disable video recording
  ```

- To avoid error `spawnSync /bin/sh ENOBUFS` thrown when Heroku deploys, remove directory `./node_modules` right before deploy:

  ```yaml
  - name: remove files
    run: rm ./node_modules -rf
  ```

  _I don't know why but this way works._

- Add scripts in husky hooks (e.g. in `.husky/precommit` or `./package.json`), to avoid git commands during Heroku deployment triggering hooks:

  ```bash
  if [[$CI -ne true]]; then # trigger before commit only when environment variable CI is not true
  	yarn lint:fix # eslint auto fix
  fi
  ```

  ```json
  "husky": {
    "hooks": {
      "pre-commit": "if [[$CI -ne true]]; then yarn lint:fix fi"
    }
  }
  ```

- Skip CI when only README file is pushed:

  There are [several ways](https://stackoverflow.com/q/59759921).

  1.  Use Github's built-in feature to skip CI on any labeled commits. Include keywords in your commit message like [skip ci], [ci skip], [no ci], [skip actions], or [actions skip].

  2.  Ignore specified path in workflow file:

      ```yaml
      on:
      push:
      paths-ignore:
        - "README.md"
      ```
