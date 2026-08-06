import * as core from '@actions/core';

async function run() {
    try {
        await execute()
    } catch (error) {
        core.setFailed(error.message)
    }
}

async function execute() {
    const { slackWebhookUrl, message, isMarkdown } = getAndValidateInput()
    const resp = await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            'text': message,
            'mrkdwn': isMarkdown,
        }),
    })
    console.log('Response body:')
    console.log(await resp.text())
    if (resp.status !== 200) {
        throw new Error(`Message status was not 200. got ${resp.status}`)
    }
}

function getAndValidateInput() {
    const slackWebhookUrl = core.getInput('slack_webhook_url', { required: true })
    const message = core.getInput('message', { required: true })
    let isMarkdown = core.getInput('is_markdown', { required: false }) === 'true'

    return {
        slackWebhookUrl,
        message,
        isMarkdown,
    }
}

run()
