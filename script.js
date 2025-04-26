// // import { GoogleGenAI } from "@google/genai";

// // const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

// // async function sendToGemini(message) {
// //     const response = await ai.models.generateContent({
// //         model: "gemini-2.0-flash",
// //         contents: message,
// //     });
// //     return response.text;
// // }

// document.addEventListener('DOMContentLoaded', () => {
//     const heatingCard = document.querySelector('.serviceCard.heating');
//     const chatbotModal = document.getElementById('chatbotModal');
//     const closeBtn = document.getElementById('closeChat');
//     const sendBtn = document.getElementById('sendBtn');
//     const userInput = document.getElementById('userInput');
//     const chatLog = document.getElementById('chatLog');

//     heatingCard.addEventListener('click', () => {
//         chatbotModal.classList.remove('hidden');
//     });

//     closeBtn.addEventListener('click', () => {
//         chatbotModal.classList.add('hidden');
//         userInput.value = '';
//     });

//     sendBtn.addEventListener('click', async () => {
//         const userText = userInput.value.trim();
//         if (!userText) return;

//         const userMessage = document.createElement('p');
//         userMessage.textContent = "You: " + userText;
//         chatLog.appendChild(userMessage);

//         userInput.value = "";

//         const botReply = await sendToGemini(userText);
//         const botMessage = document.createElement('p');
//         botMessage.textContent = "Bot: " + botReply;
//         chatLog.appendChild(botMessage);
//         chatLog.scrollTop = chatLog.scrollHeight;
//     });
// });


// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Service cards click handlers
    const serviceCards = document.querySelectorAll('.serviceCard');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatLog = document.getElementById('chatLog');

    // Open chatbot modal when a service card is clicked
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.classList.contains('heating') ? 'Heating' :
                          this.classList.contains('plumbing') ? 'Plumbing' : 'AC';

            // Update modal title based on service
            document.querySelector('.chatbotContent h2').textContent =
                `${service} Support - Winnipeg Homes`;

            // Reset chat log with service-specific greeting
            chatLog.innerHTML = `
                <p class="bot">Hi! Need help with ${service.toLowerCase()}? Try these:</p>
                <ul id="suggestedQuestions">
                    ${getServiceSuggestions(service)}
                </ul>
            `;

            // Add click handlers to suggested questions
            document.querySelectorAll('#suggestedQuestions li').forEach(item => {
                item.style.cursor = 'pointer';
                item.style.textDecoration = 'underline';
                item.addEventListener('click', function() {
                    userInput.value = this.textContent;
                    sendMessage();
                });
            });

            chatbotModal.classList.remove('hidden');
        });
    });

    // Close chatbot modal
    closeChatBtn.addEventListener('click', function() {
        chatbotModal.classList.add('hidden');
    });

    // Send message handler
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessageToChat(message, 'user');
            userInput.value = '';

            // Simulate typing indicator
            const typingIndicator = document.createElement('p');
            typingIndicator.className = 'bot typing';
            typingIndicator.textContent = '...';
            chatLog.appendChild(typingIndicator);
            chatLog.scrollTop = chatLog.scrollHeight;

            // Get bot response after a short delay
            setTimeout(() => {
                chatLog.removeChild(typingIndicator);
                const botResponse = getBotResponse(message);
                addMessageToChat(botResponse, 'bot');
            }, 1000);
        }
    }

    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('p');
        messageElement.className = sender;
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function getServiceSuggestions(service) {
        if (service === 'Heating') {
            return `
                <li>Why is my furnace blowing cold air?</li>
                <li>How often should I service my boiler?</li>
                <li>What to do if my thermostat is not responding?</li>
            `;
        } else if (service === 'Plumbing') {
            return `
                <li>My pipes are frozen - what should I do?</li>
                <li>How to fix a leaky faucet?</li>
                <li>What causes low water pressure?</li>
            `;
        } else { // AC
            return `
                <li>Why is my AC not cooling properly?</li>
                <li>How often should I replace AC filters?</li>
                <li>What's the ideal temperature setting for summer?</li>
            `;
        }
    }

    function getBotResponse(userMessage) {
        // Convert user message to lowercase for easier matching
        const message = userMessage.toLowerCase();
        const service = document.querySelector('.chatbotContent h2').textContent;

        // General responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I help you with your home service needs today?";
        }

        if (message.includes('thank')) {
            return "You're welcome! Is there anything else you'd like to know?";
        }

        if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Don't hesitate to reach out if you have more questions.";
        }

        // Service-specific responses
        if (service.includes('Heating')) {
            if (message.includes('cold air') || message.includes('not heating')) {
                return "If your furnace is blowing cold air, check if: 1) The thermostat is set to 'heat' mode, 2) The filter is clean, 3) The pilot light is on. If these seem fine, you may need a professional to check the gas supply or heat exchanger.";
            } else if (message.includes('service') || message.includes('maintenance')) {
                return "We recommend annual furnace maintenance before winter. This includes cleaning, inspecting components, and checking for carbon monoxide leaks. Regular service can improve efficiency by up to 30% and prevent breakdowns.";
            } else if (message.includes('thermostat') || message.includes('not responding')) {
                return "For thermostat issues: 1) Try replacing batteries, 2) Check circuit breaker, 3) Ensure it's properly connected. If it's still not working, you may need a Wi-Fi thermostat upgrade or professional wiring check.";
            }
        } else if (service.includes('Plumbing')) {
            if (message.includes('frozen') || message.includes('freezing')) {
                return "For frozen pipes: 1) Keep faucet open to relieve pressure, 2) Apply heat with a hair dryer (never open flame), 3) Call us immediately if pipe bursts. Prevent freezing by insulating pipes and keeping cabinet doors open during cold snaps.";
            } else if (message.includes('leak') || message.includes('drip')) {
                return "Most leaks are caused by worn washers or O-rings. Turn off water supply, disassemble the faucet, and replace the damaged parts. For pipe leaks, use a pipe clamp as temporary fix until a plumber can make permanent repairs.";
            } else if (message.includes('pressure') || message.includes('low water')) {
                return "Low water pressure can result from: 1) Mineral buildup in aerators (clean or replace), 2) Partially closed shutoff valves, 3) Pipe corrosion, or 4) Municipal supply issues. Check multiple faucets to determine if it's isolated or whole-house.";
            }
        } else if (service.includes('AC')) {
            if (message.includes('not cooling') || message.includes('warm air')) {
                return "If your AC isn't cooling: 1) Check thermostat settings, 2) Clean or replace air filter, 3) Clear debris around outdoor unit, 4) Check circuit breaker. If these don't help, you may need refrigerant recharge or compressor service.";
            } else if (message.includes('filter') || message.includes('replace')) {
                return "AC filters should be replaced every 1-3 months during cooling season. Homes with pets or allergies may need monthly changes. Use MERV 8-11 filters for best balance of air quality and system efficiency.";
            } else if (message.includes('temperature') || message.includes('setting')) {
                return "For energy efficiency, set your thermostat to 25°C (78°F) when home and 28°C (82°F) when away. Each degree lower increases cooling costs by 6-8%. Use ceiling fans to feel 4°C cooler without changing thermostat.";
            }
        }

        // Default response if no specific match
        return "I'm sorry, I don't have specific information about that. For detailed assistance with your issue, I recommend scheduling a service call with one of our Winnipeg Home Pros technicians who can assess your situation in person.";
    }

    // Close modal when clicking outside
    chatbotModal.addEventListener('click', function(e) {
        if (e.target === chatbotModal) {
            chatbotModal.classList.add('hidden');
        }
    });
});