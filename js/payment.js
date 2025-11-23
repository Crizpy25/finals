document.addEventListener('DOMContentLoaded', () => {
    
    const cards = document.querySelectorAll('.problem-card');

   
    const messages = {
        "Payment Issues": "You selected Payment Issues. Please fill out the payment support form.",
        "Delivery Problems": "You selected Delivery Problems. Please provide your order details.",
        "Account Issues": "You selected Account Issues. Please provide your account info.",
        "Technical Problems": "You selected Technical Problems. Our team will help you shortly.",
        "Other Issues": "You selected Other Issues. Please describe your problem."
    };

   
    cards.forEach(card => {
        card.addEventListener('click', () => {
           
            const titleSpan = card.querySelector('span:nth-child(2)');
            const typeText = titleSpan.textContent.trim();

        
            if (messages[typeText]) {
                alert(messages[typeText]);
            } else {
                alert("You selected a problem type.");
            }
        });
    });
});
