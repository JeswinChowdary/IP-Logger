async function getIP(){
    const clientIP = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => { return data.ip });

    fetch('/api/store-ip-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ip: clientIP
        })
    }).then(res => res.json()).then(response => {
        const deathText = document.querySelector('.death-text');
        deathText.innerText = 'Your IP address is on its way to our database, take a coffee while we steal your IP and sell it!!! Contact me on discord for your IP info back: "•ПYƬЯӨ•#2600"';
        console.log(response);
    })
} 

getIP();