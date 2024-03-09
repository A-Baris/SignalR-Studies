$(document).ready(function () {

    const broadcastMessage = "broadcastMessage";
    const broadcastMessageForPrivateClient = "broadcastMessageForPrivateClient";
    const broadcastMessageForOthersClient = "broadcastMessageForOthersClient";
    const broadcastMessageForSelectedClient = "broadcastMessageForSelectedClient";


    const receiveMessage = "receiveMessage";
    const receiveConnectedClientNumber = "receiveConnectedClientNumber";
    const receiveMessageForPrivateClient = "receiveMessageForPrivateClient";
    const receiveMessageForOthersClient = "receiveMessageForOthersClient";
    const receiveMessageForSelectedClient = "receiveMessageForSelectedClient";
    const connection = new signalR.HubConnectionBuilder().withUrl("/signalrtypesafehub").configureLogging(signalR.LogLevel.Information).build();

    function start() {
        connection.start().then(() => {
            console.log("Hub bağlantı kuruldu");
            $("#div-connection-id").html(`Connection Client Id : ${connection.connectionId}`);
        });
    }
    try {
        start();
    }
    catch {
        setTimeout(() => start(), 5000);
    }

    connection.on(receiveMessage, (message) => {
        console.log("Received Message: ", message);
    });


    const span_client_number = $("#span-connected-client-number");

    connection.on(receiveConnectedClientNumber, (count) => {
        span_client_number.text(`(${count})`);
        console.log("ConnectedClientNumber: ", count);
    });

    connection.on(receiveMessageForPrivateClient, (message) => {
      
        console.log("(private) Message : ", message);
    });
    connection.on(receiveMessageForOthersClient, (message) => {

        console.log("(Others) Message : ", message);
    });
    connection.on(receiveMessageForSelectedClient, (message) => {

        console.log("(SelectedClient) Message : ", message);
    });

    $("#btn-send-message").click(function () {
        const message = "Welcome to the project";
        connection.invoke(broadcastMessage, message).catch(err => console.error("hata", err));
    });

    $("#btn-send-message-for-private-client").click(function () {
        const message = "Welcome to the project -private client-";
        connection.invoke(broadcastMessageForPrivateClient, message).catch(err => console.error("hata", err));
    });

    $("#btn-send-message-for-others-client").click(function () {
        const message = "Welcome to the project -others client-";
        connection.invoke(broadcastMessageForOthersClient, message).catch(err => console.error("hata", err));
    });
    $("#btn-send-message-for-selected-client").click(function () {
        const message = "You are selected client";
        const connectionId = $("#text-connectionId").val();
        connection.invoke(broadcastMessageForSelectedClient, connectionId, message)
            .catch(err => console.error("hata", err));
    })
});