import React, { useState, useEffect, useRef } from 'react';
import './TextEditor.css'

function JsonTextArea({ data, modifyData }) {
    const [formattedData, setFormattedData] = useState('');
    const textAreaRef = useRef(null);

    // Format JSON data when the component mounts or when data changes
    useEffect(() => {
        if (data) {
            const formatted = JSON.stringify(data, null, 2);
            setFormattedData(formatted);
            adjustTextAreaHeight(formatted);
        }
    }, [data]);

    const adjustTextAreaHeight = (value) => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto'; // Reset height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to scroll height
        }
    };

    // Handle changes in the textarea
    const handleChange = (event) => {
        const newValue = event.target.value;
        setFormattedData(newValue);
        adjustTextAreaHeight(newValue);
        
        try {
            const parsedData = JSON.parse(newValue);
            console.log(parsedData)
            modifyData(parsedData);  // Update the data with parsed JSON
        } catch (error) {
            console.error("Invalid JSON format", error);
        }
    };

    return (
        <textarea
            ref={textAreaRef}
            value={formattedData}
            onChange={handleChange}
            rows={1}
            className='jsonEditor'
            style={{
                resize: 'none',  // Prevent manual resizing
                overflow: 'hidden', // Hide scrollbar
            }}
        />
    );
}

export default JsonTextArea;
