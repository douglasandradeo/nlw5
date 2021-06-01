const socket = io();
let usersConnections = []; // necessário declarar como let, pois posteriormente ela será redeclarada (const não permite redeclarar)

socket.on("admin_list_all_users", (connections) => {
    usersConnections = connections;
    document.getElementById("list_users").innerHTML = "";

    let template = document.getElementById("template").innerHTML;

    connections.forEach(connection => {

        const rendered = Mustache.render(template, {
            email: connection.user.email,
            id: connection.socket_id
        })
        
        document.getElementById("list_users").innerHTML += rendered; 
    });
});

function call(id) { // função para abertura de chat para que o admin acesse e responda mensagens recebidas

    const connection = usersConnections.find(
        connection => connection.socket_id === id
    )

    const template = document.getElementById("admin_template").innerHTML;

    const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.user_id
    })

    document.getElementById("supports").innerHTML += rendered;

    const params = {
        user_id: connection.user_id 
    };

    socket.emit("admin_list_messages_by_user", params, (messages) => {
        const divMessages = document.getElementById(`allMessages${connection.user_id}`);

        messages.forEach((message) => {
            const createDiv = document.createElement("div");

            if (message.admin_id === null) {
                createDiv.className = "admin_message_client";

                createDiv.innerHTML = `<span>${connection.user.email} </span>`;
                createDiv.innerHTML += `<span>${message.text}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}`;

            } else {
                createDiv.className = "admin_message_admin";

                createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}`;
            }

            divMessages.appendChild(createDiv);
        });
    })
    // 41:40 continuação
}

