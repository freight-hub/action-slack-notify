# Action: Send a notification to slack


## Inputs

### `slack_webhook_url`

**Required** URL of the webhook called. You can create this webhook by creating a slack app. Follow the guide [here](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack)

### `message`

**Required** The message you would like to send

### `is_markdown`



## No outputs

## Example usage

Send a message on slack

```yaml
name: Notify slack
id: slack
uses: freight-hub/action-slack-notify@v1.0
with:
  slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
  message: 'hello channel!'
  is_markdown: false
```

## Contributing

When contributing to this library there are some points to note:

1. Please run `yarn format` & `yarn build` BEFORE pushing to the repository.
2. The `dist` folder is checked in (we compile the node_modules into it with `@vercel/ncc`)
   - this is because we need to include the complete script in the repository for github
3. Please keep this readme up to date
4After you have comitted, you can tag the repository to 'build' a new version for use in actions