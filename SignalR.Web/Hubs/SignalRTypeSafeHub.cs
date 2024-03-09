using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class SignalRTypeSafeHub : Hub<ISignalRTypeSafeHub>
    {
        private static int ConnectedClientNumber = 0;
        public async Task BroadcastMessage(string message)
        {
            await Clients.All.ReceiveMessage(message);

        }

        public override async Task OnConnectedAsync()
        {
            ConnectedClientNumber++;
            await Clients.All.ReceiveConnectedClientNumber(ConnectedClientNumber);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedClientNumber--;
            await Clients.All.ReceiveConnectedClientNumber(ConnectedClientNumber);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task BroadcastMessageForPrivateClient(string message)
        {
            await Clients.Caller.ReceiveMessageForPrivateClient(message);

        }
        public async Task BroadcastMessageForOthersClient(string message)
        {
            await Clients.Others.ReceiveMessageForOthersClient(message);

        }

        public async Task BroadcastMessageForSelectedClient(string connectionId,string message)
        {
            await Clients.Client(connectionId).ReceiveMessageForSelectedClient(message);

        }

    }
}
