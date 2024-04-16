document.addEventListener('DOMContentLoaded', function() {
    var chatBox = document.getElementById('chatMessages');
    var userInput = document.getElementById('userMessage');
    var sendButton = document.getElementById('send-button');
    var messengerIcon = document.querySelector('.messenger-icon'); 
    var chatboxContainer = document.querySelector('.chatbox-container');
    var closeButton = document.querySelector('.close-button');
    var refreshButton = document.querySelector('.refresh-button');
    closeButton.addEventListener('click', closeChatbox);
    function closeChatbox() {
        chatBox.innerHTML = '';
        chatboxContainer.style.display = 'none';
    }
    refreshButton.addEventListener('click', function() {
        chatBox.innerHTML = ''; // Clear chat history
        sendGreetingMessage();
    });
     // Add click event listener to the messengerIcon
     messengerIcon.addEventListener('click', function() {
        
        // Toggle visibility of the chatbox container
        if (chatboxContainer.style.display === 'none' || !chatboxContainer.style.display) {
            chatboxContainer.style.display = 'block';
            // Focus on the user input box
            userInput.focus();
            sendGreetingMessage();
        } else {
            chatboxContainer.style.display = 'none';
        }
        userInput.addEventListener('keydown', function(event) {
            // Check if the Enter key is pressed
            if (event.keyCode === 13) {
                // Prevent the default behavior of the Enter key (e.g., form submission)
                event.preventDefault();
                // Call the sendMessage function to send the message to the chatbot
                sendMessage();
            }
        });
    
    });

    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        var message = userInput.value.trim();
        if (message === '') return;
    
        if (message.toLowerCase().includes('admission')) {
            displayUserMessage(message);
            fetchBotResponse('admission'); // Directly call fetchBotResponse with 'admission' argument
            userInput.value = ''; // Clear user input
            return; // Exit the function
        }
          // Check for specific inputs and respond accordingly
    if (message.toLowerCase().includes('courses') || message.toLowerCase().includes('programmes')) {
        displayUserMessage(message);
        displayBotMessage('We offer?');
        setTimeout(function() {
            displaySuboptions();
        }, 500);
        userInput.value = '';
        return;
    }
    // Check for contact-related input
    if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('phone') || message.toLowerCase().includes('email') || message.toLowerCase().includes('location')) {
        displayUserMessage(+ message);
        fetchBotResponse('contact'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    // Check for contact-related input
    if (message.toLowerCase().includes('eligibility')) {
        displayUserMessage(message);
        fetchBotResponse('eligibility'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('civil engineering')) {
        displayUserMessage(message);
        fetchBotResponse('civil engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('mechanical engineering')) {
        displayUserMessage(message);
        fetchBotResponse('mechanical engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('electronics & communication engineering')) {
        displayUserMessage(message);
        fetchBotResponse('electronics & communication engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('computer science & engineering')) {
        displayUserMessage(message);
        fetchBotResponse('computer science & engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('electronics & instrumentation engineering')) {
        displayUserMessage(message);
        fetchBotResponse('electronics & instrumentation engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('information science & engineering')) {
        displayUserMessage(message);
        fetchBotResponse('information science & engineering'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    if (message.toLowerCase().includes('computer science and business systems')) {
        displayUserMessage(message);
        fetchBotResponse('computer science and business systems'); // Directly call fetchBotResponse with 'contact' argument
        userInput.value = ''; // Clear user input
        return; // Exit the function
    }
    
    
        displayUserMessage(message);
    
        // Send user input to the server for processing
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            // Check if response is empty
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data); // Debugging statement
            if (data && data.response) {
                displayBotMessage(data.response);
                // Generate options
                if (data.intent === 'greeting') {
                    setTimeout(function() {
                        displayOptions();
                    }, 500);
                }
            } else {
                console.error('Invalid response from server:', data); // Debugging statement
            }
        });
    
        userInput.value = '';
    }
    
    function sendGreetingMessage() {
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'greeting' })
        })
        .then(response => {
            // Check if response is empty
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data); // Debugging statement
            if (data && data.response) {
               
                // Display bot's response if it exists
                setTimeout(function() {
                  
                displayBotMessage(data.response);
                 // Generate options
                displayOptions();
            },500);
            } else {
                console.error('Invalid response from server:', data); // Debugging statement
            }
           
        });
        
        
    }
    
   
    function displayOptions() {
        displayOption('Admission');
        displayOption('Programmes');
        displayOption('Contact');
        displayOption('Eligibility');
        displayOption('Gallery');
        displayOption('Examination');

        
    }
    
    function displayOptionWithSuboptions(optionText, suboptions) {
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        var optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
    
        optionElement.addEventListener('click', function() {
            // Clear chat box before displaying suboptions
           
            displayUserMessage(optionText);
            displayMessage('Are you a?');
            displaySuboptions(suboptions);
        });
    
        optionElement.addEventListener('mouseover', function() {
            optionElement.style.backgroundColor = 'crimson';
            optionElement.style.color = 'white';
        });
    
        optionElement.addEventListener('mouseout', function() {
            optionElement.style.backgroundColor = 'white';
            optionElement.style.color = 'crimson';
        });
    
        optionContainer.appendChild(optionElement);
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displaySuboptions() {
       displayOption('Undergraduate');
       displayOption('Postgraduate');
    }
    
    

    function displayMessage(message, color, isBotMessage = true ) {
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.color = color;
        if (isBotMessage) {
            messageElement.classList.add('bot-message'); // Add bot message class
        } else {
            messageElement.classList.add('user-message'); // Add user message class
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayUserMessage(message) {
        // Create a container for the user message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('user-message-container');
    
        // Create the user image element
        var userImage = document.createElement('img');
        userImage.src = 'static/assets/userimage2.png'; // Replace 'path_to_your_user_image.jpg' with the actual path to your user image
        userImage.classList.add('user-image');
    
        // Create the user message element
        var messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add('user-message');
        messageElement.style.color = 'white';
    
        // Append the user image and message to the container
        
        messageContainer.appendChild(messageElement);
        messageContainer.appendChild(userImage);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function displayBotMessage(message, color) {
        // Create a container for the bot message and image
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('bot-message-container');
    
        // Create the bot image element
        var botImage = document.createElement('img');
        botImage.src = 'static/assets/Mira_black.png'; // Replace 'path_to_your_bot_image.jpg' with the actual path to your bot image
        botImage.classList.add('bot-image');
    
        // Create the bot message element
        var messageElement = document.createElement('p');
        messageElement.innerHTML = message.replace(/\n/g, "<br>");
        messageElement.classList.add('bot-message');
        messageElement.style.color = 'white';

    
        // Append the bot image and message to the container
        messageContainer.appendChild(botImage);
        messageContainer.appendChild(messageElement);
    
        // Append the container to the chat box
        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function displayFeedbackMessage() {
        // Create feedback options container
        var feedbackContainer = document.createElement('div');
        feedbackContainer.classList.add('feedback-container');
    
        // Create feedback message
        var feedbackMessage = document.createElement('p');
        feedbackMessage.textContent = "Was I able to answer your question?";
        feedbackContainer.appendChild(feedbackMessage);
    
        // Create like button
        var likeButton = document.createElement('button');
        likeButton.textContent = "👍";
        likeButton.classList.add('feedback-button');
        likeButton.addEventListener('click', function() {
            displayUserMessage('👍');
            setTimeout(function() {
                fetchFeedbackResponse('like');
            }, 500);
        });
        feedbackContainer.appendChild(likeButton);
    
        // Create dislike button
        var dislikeButton = document.createElement('button');
        dislikeButton.textContent = "👎";
        dislikeButton.classList.add('feedback-button');
        dislikeButton.addEventListener('click', function() {
            displayUserMessage('👎');
            setTimeout(function() {
                fetchFeedbackResponse('dislike');
            }, 500);
        });
        feedbackContainer.appendChild(dislikeButton);
    
        // Append feedback options container to the chat box
        chatBox.appendChild(feedbackContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
   
    
    function displayOption(optionText) {
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        var optionElement = document.createElement('div');
        optionElement.textContent = optionText;
        optionElement.classList.add('option');
        optionElement.style.marginBottom = '10px';
        
        
        
        optionElement.addEventListener('click', function() {
            // Display user message
            displayUserMessage(optionText);
            // Fetch bot response
           setTimeout(function() {
            fetchBotResponse(optionText);
           },500);
        });
    
    
        optionElement.addEventListener('mouseover', function() {
            optionElement.style.backgroundColor = 'crimson';
            optionElement.style.color = 'white';
        });
    
        optionElement.addEventListener('mouseout', function() {
            optionElement.style.backgroundColor = 'white';
            optionElement.style.color = 'crimson';
        });
    
        optionContainer.appendChild(optionElement);
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function fetchBotResponse(optionText) {
        // You can customize this function to fetch appropriate responses based on selected option
        var botResponse = '';
        var link = '';
        if (optionText.toLowerCase() === 'admission') {
            botResponse = "Click below link to see admission form: ";
            link = "<a href='https://admissions.mcehassan.ac.in/' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
         else if (optionText.toLowerCase() === 'programmes') {
            botResponse = "We offer?";
            displayBotMessage(botResponse);
            displaySuboptions();
        }
        else if (optionText.toLowerCase() === 'undergraduate') {
            botResponse = "Our Undergraduate Programs are";
            displayBotMessage(botResponse);
            displaySuboptionsofUndergraduate();
        }
        
        else if (optionText.toLowerCase() === 'postgraduate') {
            var programs = [
                "1.Digital Electronics & Communication Systems",
                "2.Computer Aided Design of Structures",
                "3.Power & Energy System",
                "4.Artificial Intelligence & Data Science",

                "I can't provide links for PG Courses you can directly connect admission office",
                
            ];
            
            var botResponse = "Our postgraduate programmes are:\n";
            botResponse += programs.join("\n");
            displayBotMessage(botResponse);
            setTimeout(function() {
                displayFeedbackMessage();
             }, 500);
        }
        else if (optionText.toLowerCase() === 'contact') {
            var phoneNumber = "08172-245317";
            var emailAddress = "admissions@mcehassan.ac.in";
            var location = "No 21, Salagame Rd, Rangoli Halla, Hassan, Karnataka 573202";
        
            var botResponse = "Phone Number: <a href='tel:" + phoneNumber + "'>" + phoneNumber + "</a><br>";
            botResponse += "Email Address: <a href='mailto:" + emailAddress + "'>" + emailAddress + "</a><br>";
            botResponse += "Location: " + location;
        
            displayBotMessage(botResponse);
            setTimeout(function() {
                displayFeedbackMessage();
            }, 500);
        }
        
        else if (optionText.toLowerCase() === 'eligibility') {
            var eligibilityInfo = [
                "1. Matriculation with 60% marks, Sr. Secondary (10+2) with minimum 70% (Aggregate) & minimum 60% marks in PCM, Computer Science/PCB for Biotechnology.",
                "2. Minimum 50% marks in Maths.",
                "3. For Management Admissions: Students have to take any one of the Entrance Examination.",
                "4.Entrance Examination: KEA / COMED-K"
            ];
        
            var botResponse = eligibilityInfo.join("<br>");
            displayBotMessage(botResponse);
            setTimeout(function() {
                displayFeedbackMessage();
            }, 500);
        }
        else if (optionText.toLowerCase() === 'civil engineering') {
            botResponse = "Click Below to know about Civil Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Civil-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'mechanical engineering') {
            botResponse = "Click Below to know about Mechanical Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Mechanical-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'electronics & communication engineering') {
            botResponse = "Click Below to know about Electronics & Communication Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Electronics-and-Communication-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'computer science & engineering') {
            botResponse = "Click Below to know about Computer Science & Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Computer-Science-and-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'electronics & instrumentation engineering') {
            botResponse = "Click Below to know about Electronics & Instrumentation Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Electronics-and-Instrumentation-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'information science & engineering') {
            botResponse = "Click Below to know about Information Science & Engineering";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Information-Science-and-Engineering' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'computer science and business systems') {
            botResponse = "Click Below to know about Computer Science and Business Systems";
            link = "<a href='https://www.mcehassan.ac.in/home/Overview/Computer-Science-and-Business-Systems' target='_blank'>Click Here</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'gallery') {
            botResponse = "Click below link to see gallery ";
            link = "<a href='https://www.mcehassan.ac.in/home/Gallerys' target='_blank'>Gallery</a>";
            displayBotMessage(botResponse + ' ' + link);
            setTimeout(function() {
               displayFeedbackMessage();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'examination') {
            displayBotMessage('What do you want to know about examinations?', 'white');
            setTimeout(function() {
                displayExaminationOptions();
            }, 500);
        }
        else if (optionText.toLowerCase() === 'process') {
            // Open the URL in a new tab
            window.open('https://www.mcehassan.ac.in/home/Process', '_blank');
            setTimeout(function() {
                displayBotMessage('Is there anything else I can help you with?');
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
        else if (optionText.toLowerCase() === 'circulars') {
            // Open the URL in a new tab
            window.open('https://www.mcehassan.ac.in/home/Circulars', '_blank');
            setTimeout(function() {
                displayBotMessage('Is there anything else I can help you with?');
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
        else if (optionText.toLowerCase() === 'seat allotment') {
            // Open the URL in a new tab
            window.open('https://www.mcehassan.ac.in/home/Seat-Allotment', '_blank');
            setTimeout(function() {
                displayBotMessage('Is there anything else I can help you with?');
                displayOptionsAfterExaminationOptions();
            }, 500);
        } 
        else if (optionText.toLowerCase() === 'results') {
            // Open the URL in a new tab
            window.open('https://www.mcehassan.ac.in/home/Results', '_blank');
            setTimeout(function() {
                displayBotMessage('Is there anything else I can help you with?');
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
        else if (optionText.toLowerCase() === 'malpractice enquiry committee') {
            // Open the URL in a new tab
            window.open('https://www.mcehassan.ac.in/home/Malpractice-Enquiry-Committee', '_blank');
            setTimeout(function() {
                displayBotMessage('Is there anything else I can help you with?');
                displayOptionsAfterExaminationOptions();
            }, 500);
        }
        
        
        
    
    }
    function displaySuboptionsofUndergraduate() {
        displayOption('Civil Engineering');
        displayOption('Mechanical Engineering');
        displayOption('Electronics & Communication Engineering');
        displayOption('Computer Science & Engineering');
        displayOption('Electronics & Instrumentation Engineering');
        displayOption('Information Science & Engineering');
        displayOption('Computer Science and Business Systems');

     }
     function displayExaminationOptions() {
        displayOption('Process');
        displayOption('Circulars');
        displayOption('Seat Allotment');
        displayOption('Results');
        displayOption('Malpractice Enquiry Committee');
    }
    
    function fetchFeedbackResponse(feedback) {
        if (feedback === 'like') {
            displayBotMessage('Thanks for your feedback. Is there anything else that I can help you with?', false);
            displayOptionsAfterFeedback();
        } else if (feedback === 'dislike') {
            displayBotMessage('Bot: I\'m sorry to hear that. Try again!.', false);
            setTimeout(function() {
                sendGreetingMessage();
            }, 500);
        }
    }
    function displayOptionsAfterFeedback() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'crimson';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            setTimeout(function() {
                displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
            }, 500);
        });
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'crimson';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function displayOptionsAfterExaminationOptions() {
        // Display options for "Yes" and "No"
        var optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');
    
        // Option for "Yes"
        var yesOptionElement = document.createElement('div');
        yesOptionElement.textContent = 'Yes';
        yesOptionElement.classList.add('option');
        yesOptionElement.addEventListener('click', function() {
            displayUserMessage('Yes');
            // Call the function to send the greeting message and display options
            sendGreetingMessage();
        });
        // Add event listener for hover effect
        yesOptionElement.addEventListener('mouseenter', function() {
            yesOptionElement.style.backgroundColor = 'crimson';
            yesOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        yesOptionElement.addEventListener('mouseleave', function() {
            yesOptionElement.style.backgroundColor = 'white';
            yesOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(yesOptionElement);
    
        // Option for "No"
        var noOptionElement = document.createElement('div');
        noOptionElement.textContent = 'No';
        noOptionElement.classList.add('option');
        noOptionElement.addEventListener('click', function() {
            displayUserMessage('No');
            // Display farewell message
            displayBotMessage('Thanks for visiting the chatbot. Feel free to ask questions.', false);
        });
        // Add event listener for hover effect
        noOptionElement.addEventListener('mouseenter', function() {
            noOptionElement.style.backgroundColor = 'crimson';
            noOptionElement.style.color = 'white';
        });
        // Remove hover effect when mouse leaves
        noOptionElement.addEventListener('mouseleave', function() {
            noOptionElement.style.backgroundColor = 'white';
            noOptionElement.style.color = 'crimson';
        });
        optionContainer.appendChild(noOptionElement);
    
        // Append options container to the chat box
        chatBox.appendChild(optionContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
   
 
});