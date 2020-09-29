# social-network-group-2

For the rest to make sense, make sure you are using a Linux-like environment. I think [https://ubuntu.com/tutorials/ubuntu-on-windows#1-overview](this) shell works well for Windows.

**Useful git alias**
This alias is nice to have as it displays the commit history quite nicely. Simply copy and paste the command in the shell.

```
git config --global alias.graph "log --graph --decorate --color --oneline --all --cherry-mark"
```

This gives the command `git graph` which displays our commit history.

## Quick Start: Install pipenv/npm and install dependencies

Start by installing dependencies. It is wise to go through both backend and frontend.

**Backend**
[Installation Link for pipenv](https://pypi.org/project/pipenv/)

I'm on Mac, so I used `brew` to install it.

You should have access to the `pipenv` command now. Navigate to the same directory where `Pipfile` and `Pipfile.lock` are (ie. root directory of repository). This contains the dependencies for our project.

Run `pipenv install` and all dependencies will be installed in a virtual environment. Note you might get an error having to do with `psycopg2`. This is ok since this is mostly related to heroku deployments. Since the deployment is fine, we'll ignore it for now.

After the command completes, run `pipenv shell` to enter the virtual environment. You will notice the result of `pip list` is specific to our project. Use `pipenv install package-name` to add new dependencies. The Pipfile will be automatically updated.

**Frontend**
[Install](https://www.npmjs.com/get-npm) npm.

The dependencies for the frontend are in `package.json`. `package-lock.json` is auto generated.

Run `npm install` and it will take care of all frontend dependencies. Note that if a new package is needed, run `npm install new-package`. Like `pipenv`, `npm` will automatically update `package.json`.

## Building code

To test local changes, you may run `heroku local`. It seems that this _should_ build both the frontend and backend.

More verbosely, we can run `python manage.py runserver` to start the backend and `npm run dev` to reflect our frontend changes.

## Code Contributions:

Let's monitor what goes into the `master` branch very closely. So we should _always_ be working in a separate branch. The `master` branch should only receive commits through the pull request (code review) feature on Github. Here is an example workflow.

1. Create a new branch to address a new feature/task

```
git checkout -b name-of-my-branch
```

2. Make some code changes and commit them.

```
> git status
On branch name-of-my-branch
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")

> git add .
> git commit -a -m 'commit message'
```

3. After a local commit, we push to a new remote branch.

```
git push -u origin name-of-my-branch:name-of-my-branch
```

4. Go to our [https://github.com/rickotten/Privy](repository). Our new branch will be available in the drop-down menu of the branches. We can initiate a pull-request from here. At this point, team members will review the changes and approve/reject them and merge them into `master` accordingly.

5. After you are done with the branch (ie. it is merged), delete it to keep our repo clean. The pull-request should prompt you to delete it after it is merged.
