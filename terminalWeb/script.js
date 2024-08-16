const terminalBody = document.querySelector('.terminal-body');
const soundEffect = document.getElementById('sound-effect');

// Location descriptions and art
const locations = {
    'gateway': `You are at the Gateway. It is the central hub of the network. 
    Commands: 'go firewall', 'go server', 'look around', 'scan network'`,
    'firewall': `You are in the Firewall Zone. Complex rules protect this area. 
    Commands: 'go gateway', 'look around', 'analyze logs', 'bypass firewall'`,
    'server': `You are in the Server Room. Critical data and configurations are here. 
    Commands: 'go gateway', 'look around', 'decrypt data', 'search vulnerabilities'`,
    'hidden_chamber': `You found a Hidden Chamber with encrypted files. 
    Commands: 'go server', 'look around', 'decrypt file', 'crack password'`,
    'exit_node': `You are at the Exit Node. Submit your findings to complete the maze. 
    Commands: 'go hidden_chamber', 'submit report', 'review findings'`,
};

const locationArt = {
    'gateway': `
   /\\\\
  /  \\\\
 /____\\\\
/      \\\\
    `,
    'firewall': `
 |^|
 |=|
 | |
 |_|
    `,
    'server': `
 _____
|     |
|  |  |
|__|__|
    `,
    'hidden_chamber': `
  ___
 |   |
 |___|
  ___
    `,
    'exit_node': `
 ____
|    |
|Exit|
|____|
    `
};

// Task descriptions and scores
const tasks = {
    'analyze logs': `You analyze the firewall logs and discover a pattern that reveals a vulnerability.`,
    'bypass firewall': `You successfully bypass the firewall using advanced techniques.`,
    'decrypt data': `You decrypted the data and uncovered critical information about the network.`,
    'search vulnerabilities': `You found several vulnerabilities in the server configurations.`,
    'decrypt file': `You decrypted the file and discovered a hidden access key.`,
    'crack password': `You cracked the password and gained access to the hidden chamber.`,
    'submit report': `You submitted your findings and are recognized for your skills.`,
    'review findings': `You review your findings and see that you've successfully navigated the maze.`,
};

// Command scores based on actions
const actionScores = {
    'analyze logs': 10,
    'bypass firewall': 20,
    'decrypt data': 15,
    'search vulnerabilities': 15,
    'decrypt file': 25,
    'crack password': 30,
    'submit report': 50,
    'review findings': 10
};

const commandHandlers = {
    'go': (args) => {
        const location = args.join(' ');
        if (locations[location]) {
            updateLocation(location);
        } else {
            printOutput(`Unknown location: ${args.join(' ')}`, 'error');
        }
    },
    'look': (args) => {
        if (args.join(' ') === 'around') {
            printOutput(`You see: ${locations[currentLocation]}`, 'info');
        } else {
            printOutput(`Unknown action: ${args.join(' ')}`, 'error');
        }
    },
    'analyze logs': () => {
        if (currentLocation === 'firewall') {
            printOutput(tasks['analyze logs'], 'success');
            updateScore(actionScores['analyze logs']);
        } else {
            printOutput(`You can't analyze logs here.`, 'error');
        }
    },
    'bypass firewall': () => {
        if (currentLocation === 'firewall') {
            printOutput(tasks['bypass firewall'], 'success');
            updateScore(actionScores['bypass firewall']);
        } else {
            printOutput(`You can't bypass the firewall here.`, 'error');
        }
    },
    'decrypt data': () => {
        if (currentLocation === 'server') {
            printOutput(tasks['decrypt data'], 'success');
            updateScore(actionScores['decrypt data']);
        } else {
            printOutput(`You can't decrypt data here.`, 'error');
        }
    },
    'search vulnerabilities': () => {
        if (currentLocation === 'server') {
            printOutput(tasks['search vulnerabilities'], 'success');
            updateScore(actionScores['search vulnerabilities']);
        } else {
            printOutput(`You can't search for vulnerabilities here.`, 'error');
        }
    },
    'decrypt file': () => {
        if (currentLocation === 'hidden_chamber') {
            printOutput(tasks['decrypt file'], 'success');
            updateScore(actionScores['decrypt file']);
        } else {
            printOutput(`You can't decrypt the file here.`, 'error');
        }
    },
    'crack password': () => {
        if (currentLocation === 'hidden_chamber') {
            printOutput(tasks['crack password'], 'success');
            updateScore(actionScores['crack password']);
        } else {
            printOutput(`You can't crack the password here.`, 'error');
        }
    },
    'submit report': () => {
        if (currentLocation === 'exit_node') {
            printOutput(tasks['submit report'], 'success');
            updateScore(actionScores['submit report']);
        } else {
            printOutput(`You can't submit the report here.`, 'error');
        }
    },
    'review findings': () => {
        if (currentLocation === 'exit_node') {
            printOutput(tasks['review findings'], 'success');
            updateScore(actionScores['review findings']);
        } else {
            printOutput(`You can't review findings here.`, 'error');
        }
    },
    'help': () => {
        const helpText = `Available commands:
  - go <location>: Move to a different location
  - look around: Look around the current location
  - analyze logs: Analyze firewall logs (requires being in the firewall zone)
  - bypass firewall: Bypass the firewall (requires being in the firewall zone)
  - decrypt data: Decrypt server data (requires being in the server room)
  - search vulnerabilities: Search for vulnerabilities (requires being in the server room)
  - decrypt file: Decrypt a file (requires being in the hidden chamber)
  - crack password: Crack a password (requires being in the hidden chamber)
  - submit report: Submit your findings (requires being at the exit node)
  - review findings: Review your findings (requires being at the exit node)
  - help: Show this help message`;
        printOutput(helpText, 'info');
    },
    'clear': () => {
        terminalBody.innerHTML = "";
        createNewPrompt();
    }
};

let currentLocation = 'gateway';
let score = 0;

function handleCommand(command) {
    const [cmd, ...args] = command.split(' ');
    printOutput(`bi0sblr@ASEB:~$ ${command}`, 'info');
    if (commandHandlers[cmd]) {
        commandHandlers[cmd](args);
        playSound();
    } else {
        printOutput(`Unknown command: ${command}`, 'error');
        playSound();
    }
}

function printOutput(output, type) {
    const newOutput = document.createElement('div');
    newOutput.classList.add('output', type);
    terminalBody.insertBefore(newOutput, document.querySelector('.prompt-line'));
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < output.length) {
            newOutput.textContent += output.charAt(i);
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else {
            clearInterval(typing);
        }
    }, 30);
}

function createNewPrompt() {
    const promptLine = document.createElement('div');
    promptLine.classList.add('prompt-line');
    promptLine.innerHTML = `<span class="prompt">bi0sblr@ASEB:~$</span> <input type="text" class="command-input" autofocus>`;
    
    terminalBody.appendChild(promptLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    const commandInput = document.querySelector('.command-input');
    commandInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                handleCommand(command);
                commandInput.value = '';
            }
        }
    });

    commandInput.addEventListener('focus', function() {
        commandInput.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
}

function updateLocation(location) {
    currentLocation = location;
    if (locationArt[location]) {
        printOutput(locationArt[location], 'art');
    }
    printOutput(`Moved to ${location}: ${locations[location]}`, 'info');
    updateStats();
}

function playSound() {
    soundEffect.play();
}

function updateScore(points) {
    score += points;
    updateStats();
}

function updateStats() {
    document.getElementById('score').textContent = score;
    document.getElementById('current-location').textContent = currentLocation;
}

createNewPrompt();
updateStats();
printOutput("Welcome to the Terminal Simulation Game! Type 'help' for available commands.", 'info');
