import React, { useState, useEffect } from "react";

export function NameManager() {
    const [username, setUsername] = useState("John2");
    const usernamew = "John2";

    useEffect(() => {
        console.log("Updated username:", username);
        setUsername(username);
      }, [username]);

    // Function to set the name
    function setName(name) {
        usernamew = name
        console.log("Set", username, usernamew)
    }

    // Function to get the name
    function getName() {
        return username;
    }

    return {
        setName,
        getName,
    };
}
