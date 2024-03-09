namespace SignalR.Web.Hubs
{
    public interface ISignalRTypeSafeHub
    {
        Task ReceiveMessage(string message);
        Task ReceiveConnectedClientNumber(int  clientNumber);
        Task ReceiveMessageForPrivateClient(string  message);
        Task ReceiveMessageForOthersClient(string  message);
        Task ReceiveMessageForSelectedClient(string  message);
    }
}
