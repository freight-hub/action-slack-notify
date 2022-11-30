const core = require('@actions/core')
const axios = require('axios')

async function run() {
    try {
        await execute()
    } catch (error) {
        core.setFailed(error.message)
    }
}

async function execute() {
    const {slackWebhookUrl, message, isMarkdown} = getAndValidateInput()
    let result;
    try {
        result = await axios.post(slackWebhookUrl, {
            text: message,
            mrkdwn: isMarkdown
        })
    } catch (e) {
        throw new Error(`Could not post message: ${e.message}`)
    }
    if (result.status !== 200) {
        throw new Error(`Message status was not 200. got ${result.status}`)
    }
}


function getAndValidateInput() {
    const slackWebhookUrl = core.getInput('slack_webhook_url', {required: true})
    const message = core.getInput('message', {required: true})
    let isMarkdown = core.getInput('is_markdown', {required: false}) === 'true'

    return {
        slackWebhookUrl,
        message,
        isMarkdown
    }
}

;(async () => {
    await run()
})()
