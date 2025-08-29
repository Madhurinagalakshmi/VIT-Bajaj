const express = require('express');
const app = express();
const userInformation = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

// Middleware --- parses the incoming JSON requests.
app.use(express.json());
app.get('/', (req, res) => {
    res.send('API is running successfully!');
});
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: userInformation.user_id,
                message: "Invalid input: 'data' key is missing or not an array."
            });
        }

        // Arrays and variable to store the results.
        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let numbers_sum = 0;

        // Iterate through the input array.
        data.forEach(item => {
            // Convert to string and normalize quotes if needed
            const strItem = String(item).replace(/[“”]/g, '"');
            
            // Check if it is a number (as a string).
            if (!isNaN(strItem) && !isNaN(parseFloat(strItem))) {
                const num = parseInt(strItem, 10);
                if (num % 2 === 0) {
                    even_numbers.push(strItem);
                } else {
                    odd_numbers.push(strItem);
                }
                numbers_sum += num;
            } 
            // Check if the item is an alphabet or a word (allowing for curly quotes)
            else if (strItem.match(/^[a-zA-Z"“”]+$/) && strItem.replace(/[“”"]/g, '').match(/^[a-zA-Z]+$/)) {
                // Remove any quotes and convert to uppercase
                const cleanItem = strItem.replace(/[“”"]/g, '');
                alphabets.push(cleanItem.toUpperCase());
            } 
            // If it's not a number or an alphabet, it's a special character.
            else {
                special_characters.push(strItem);
            }
        });

        // Concat_string logic - collect all alphabetical characters
        let allAlphabets = [];
        data.forEach(item => {
            const strItem = String(item).replace(/[“”]/g, '"');
            if (strItem.match(/^[a-zA-Z"“”]+$/) && strItem.replace(/[“”"]/g, '').match(/^[a-zA-Z]+$/)) {
                const cleanItem = strItem.replace(/[“”"]/g, '');
                allAlphabets.push(...cleanItem.split(''));
            }
        });
        
        // Reverse and format with alternating case
        allAlphabets.reverse();
        let concat_string = "";
        allAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concat_string += char.toUpperCase();
            } else {
                concat_string += char.toLowerCase();
            }
        });

        // Constructing the final JSON response object.
        const responseData = {
            is_success: true,
            user_id: userInformation.user_id, 
            email: userInformation.email,     
            roll_number: userInformation.roll_number, 
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets, 
            special_characters: special_characters,
            sum: String(numbers_sum),
            concat_string: concat_string
        };

        res.status(200).json(responseData);

    } catch (error) {
        // to handle any unexpected exceptions.
        console.error("Error processing request:", error);
        res.status(500).json({
            is_success: false,
            user_id: userInformation.user_id,
            message: "An unexpected error occurred."
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
