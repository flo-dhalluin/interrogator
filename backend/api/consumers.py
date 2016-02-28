from channels import Group
from channels.sessions import channel_session
import json
# Connected to websocket.connect
@channel_session
def ws_add(message):
    path = message.content['path'].decode('utf8') # meeh
    subscription = path.strip("/")

    # two cases : empty we subscribe to full question list
    # slug : we subscribe to a specific one
    if(subscription == "") :
        subscription = "question-list"
    else :
        subscription = "q-%s"%(subscription)

    print(subscription)
    message.channel_session['subscription'] = subscription
    Group(subscription).add(message.reply_channel)


# Connected to websocket.disconnect
@channel_session
def ws_disconnect(message):
    Group(message.channel_session['subscription']).discard(message.reply_channel)

# emitted by Question model post_save
def list_event_consumer(msg):
    # just broadcast
    print(msg.content)
    Group('question-list').send({
        'text': json.dumps(msg.content)
    })

def details_event_consumer(msg):
    Group("q-%s"%(msg.content['slug'])).send({
        'event': message.content['event']
    })
