from api.consumers import ws_add, ws_disconnect, list_event_consumer, details_event_consumer

channel_routing = {
    "websocket.connect" : ws_add,
    "websocket.disconnect" : ws_disconnect,
    "question-list" : list_event_consumer,
    "question-details" : details_event_consumer,
}
