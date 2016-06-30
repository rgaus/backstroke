![Backstroke](https://rawgit.com/1egoman/backstroke/master/assets/logo.svg)
Backstroke
===
A Github bot to keep a fork updated with any changes made to its upstream.
Heavily inspired by Greenkeeper.

## Add Backstroke to a repository
1. Create a webhook in either a fork or a upstream repository. (`Settings` => `Webhooks & Services` => `Add Webhook`)
3. Add `http://backstroke.us` as the payload url.
4. Create the webhook, and push some code to the upstream repository to see Backstroke in action.

## How it works
![How Backstroke Works](https://raw.githubusercontent.com/1egoman/backstroke/master/assets/map.png)

### For a contributor
1. You push code to Github.
2. Backstroke will create a pull request with any unmerged upstream changes.
3. You accept Backstroke's pull request, and have updated code. Merging your code back upstream later on is painless.

### For an open source maintainer
1. You get a pull request from a contributor.
2. Backstroke will create a pull request on their fork that lets them merge in
   your upstream changes.
3. They accept Backstroke's pull request, and you merge in their code.

## FAQ
- **I don't see any pull requests on the upstream....**: Pull requests are
  always proposed on forks. Take a look there instead.

- **Why isn't Backstroke working?**: Take a look at the webhook response logs. Most likely, you'll see an error. Otherwise, open an issue.

- **Is Backstroke really all that useful?**: If you never merge upstream, then no, not really. Otherwise, if you hate
resolving merge conflicts, then it's great.

- **Can I set a custom upstream?**: No, not right now. 

- **Does Backstroke work outside of Github?**: Not yet. If there's interest, I'd love to give it a try, though.

-------
By [Ryan Gaus](http://rgaus.net)
