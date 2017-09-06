# Contributions

1. Issues (Optional but recommended)
2. Branch naming scheme
3. Make first commit
4. Pull request
5. Start developing and pushing commits to new branch
6. Mention PR is ready for review
7. Review and merge

## Issues

[File a GitHub issue!](https://github.com/thinkful-c11/devcupid/issues/new) It's polite to prefix the title with `Question`, `Bug`, or where in the application you want to raise a bug/question/suggestion in.

While you don't _need_ to do this necessarily it's good practice to create an issue raising it first, maybe some discussion on it, before you continue onward!

## Branch naming scheme

All changes should be developed in a new branch created from the `dev` branch.

Branches use the following naming conventions:

* `create/{something}` -- When you are creating a completely new feature
* `update/{something}` -- When you are iterating on an existing feature
* `fix/{something}` -- When you are fixing something broken in a feature
* `try/{something}` -- When you are trying out an idea and want feedback

For example, you can run: `git checkout dev` and then `git checkout -b fix/whatsits` to create a new `fix/whatsits` branch off of `origin/dev`.

Our `origin/dev` will be pushed to `origin/master` once ready for production.

### Short Branches

We want to avoid conflicts so branches should be small and short-lived so merge early and frequently! If a branch has a single commit that's totally okay.

## Make first commit

Empty or something minor, you need to do something to get the first commit onto your new branch. Push this on your new branch!

## Pull request

Prefix the section of the application you are affecting with your PR such as `Backend: preparing rabbit API for launch` or `Frontend: Component on button needed CSS change`.

Write a detailed description of the problem you are solving, the part of the application it'll affect, and how you plan on solving it.

## Start developing and pushing commits to the new branch

Commit and push your changes frequently to the new branch, doing `git merge dev` in your branch if you see other PRs have been accepted.

## Mention PR is ready for review

Once the PR is ready with your last commit in let folks know that it's ready to be reviewed! You shouldn't close your own issues and PRs.

## Review and merge

If you're reviewing a PR and it still has issues let the person know in a comment so it can be fixed! If you are the issuer of the issue they are working on and have new updates please update the issue or communicate to the person working on the PR directly.

# Example

1. Issues (Optional but recommended)

Bob noticed that an endpoint has a typo in it! Bob makes an issue: `Bug: Endpoint has typo` and shows how to get to the example, the bug itself, what you expected to see and what happened instead, etc. 

2. Branch naming scheme

Alice comments on Bob's issue saying that she's going to start working on it. Alice now creates a branch: `fix/1337-endpoint-typo`.

3. Make first commit

Once she's in the branch she adds a single space temporarily, commits and pushes to the branch!

4. Pull request

Time to do a pull request! The base should be `dev` and is compared to the new fix branch.

5. Start developing and pushing commits to new branch

Alice noticed that Eve's PR was reviewed and merged into `dev`. Due to this Alice now does `git merge dev` to make sure there are no conflicts in her branch `fix/1337-endpoint-typo` and if there are she resolves them in her branch.

6. Mention PR is ready for review

Finally done with the PR Alice lets everyone in the team know that it's ready for review.

7. Review and merge

Eve steps up and offers to review, verifies that the tests have run and did not fail, the changes are correct, and merges/closes the PR. Bob gets to be happy that the endpoint is now typo free!

# Credit

The vast majority of the material and ideas come from [Automattic](https://github.com/Automattic/wp-calypso/)! They're really cool so check them out sometimes huzzah.