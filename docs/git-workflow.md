# Git Workflow

## Branch Naming Scheme

All changes should be developed in a new branch created from the `dev` branch.

Branches use the following naming conventions:

* `create/{something}` -- When you are creating a completely new feature
* `update/{something}` -- When you are iterating on an existing feature
* `fix/{something}` -- When you are fixing something broken in a feature
* `try/{something}` -- When you are trying out an idea and want feedback

For example, you can run: `git checkout dev` and then `git checkout -b fix/whatsits` to create a new `fix/whatsits` branch off of `origin/dev`.

Our `origin/dev` will be pushed to `origin/master` once ready for production.

## Short Branches

We want to avoid conflicts so branches should be small and short-lived so merge early and frequently! If a branch has a single commit that's totally okay.

## Credit

The vast majority of the material and ideas come from [Automattic](https://github.com/Automattic/wp-calypso/blob/master/docs/git-workflow.md#branch-naming-scheme)! They're really cool so check them out sometimes huzzah.