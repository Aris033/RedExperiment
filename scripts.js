document.addEventListener("DOMContentLoaded", function() {

        function loadLanguage(lang) {
            return fetch(lang + '.json')
                .then(response => response.json())
                .catch(error => console.error('Error loading language file:', error));
        }
    
        loadLanguage('es').then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });
        });
    
    const startButton = document.getElementById("startButton");
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");

    const glasses = document.querySelectorAll(".glass");
    const largeBeaker2 = document.getElementById("largeBeaker2");
    const confirmButton = document.getElementById("confirmButton");
    const emptyButton = document.getElementById("emptyButton");
    const giveUpButton = document.getElementById("giveUpButton");
    const iKnowButton = document.getElementById("iKnowButton");
    const largeBeaker3 = document.getElementById("largeBeaker3");
    const confirmButton3 = document.getElementById("confirmButton3");
    const emptyButton3 = document.getElementById("emptyButton3");
    const giveUpButton3 = document.getElementById("giveUpButton3");

    let selectedGlasses = [];

    function handleGlassClick(glass) {
        if (selectedGlasses.includes(glass)) {
            glass.style.border = "1px solid #000";
            selectedGlasses = selectedGlasses.filter(g => g !== glass);
        } else {
            glass.style.border = "2px solid red";
            selectedGlasses.push(glass);
        }
    }

    function handleConfirmSelection(beaker, nextPage) {
        beaker.style.backgroundColor = "lightblue";
        confirmButton.disabled = true; // Disable the confirm button

        if (selectedGlasses.length === 2) {
            const ids = selectedGlasses.map(glass => glass.id);
            if (ids.includes("glass2") && ids.includes("glass4")) {
                beaker.style.backgroundColor = "red";
                if (nextPage) {
                    setTimeout(() => {
                        alert("¡FELICIDADES!");
                        page2.style.display = "none";
                        page3.style.display = "block";
                        confirmButton.disabled = false; // Enable the confirm button again
                        handleEmpty(largeBeaker2);
                    }, 1500);
                }
            }
        }
        if (selectedGlasses.length === 3) {
            const ids = selectedGlasses.map(glass => glass.id);
            if (ids.includes("glass1") && ids.includes("glass2") && ids.includes("glass4")) {
                beaker.style.backgroundColor = "red";
                if (nextPage) {
                    setTimeout(() => {
                        alert("¡FELICIDADES!");
                        page2.style.display = "none";
                        page3.style.display = "block";
                        confirmButton.disabled = false; // Enable the confirm button again
                        handleEmpty(largeBeaker2);
                    }, 1500);
                }
            }
        }
    }

    function handleConfirmSelectionPage3(beaker) {
        confirmButton3.disabled = true; // Disable the confirm button
        beaker.style.backgroundColor = "lightblue";
        const ids = selectedGlasses.map(glass => glass.id);

        if ((selectedGlasses.length === 2 && ids.includes("glass2") && ids.includes("glass4")) ||
            (selectedGlasses.length === 3 && ids.includes("glass1") && ids.includes("glass2") && ids.includes("glass4"))) {
            beaker.style.backgroundColor = "red";
            confirmButton3.disabled = false; // Enable the confirm button again
        } else {
            beaker.style.backgroundColor = "lightblue";
        }
    }

    function handleEmpty(beaker) {
        beaker.style.backgroundColor = "white";
        selectedGlasses.forEach(glass => {
            glass.style.border = "1px solid #000";
        });
        selectedGlasses = [];
        confirmButton.disabled = false; // Enable the confirm button again
        confirmButton3.disabled = false; 
    }

    function handleGiveUp() {
        if (confirm("¿Estás seguro? Por favor, intenta más líquidos. Recuerda que puedes probar combinaciones de líquidos o probarlos uno a la vez. Buena suerte.")) {
            alert("Experimento terminado");
            window.location.href = "survey.html"; // Redirige al cuestionario de la encuesta
        }
    }

    function handleIKnow() {
        const questions = [
            "En este experimento, ¿qué hace el líquido en el Vaso 1 solo o en interacción con los otros líquidos?",
            "En este experimento, ¿qué hace el líquido en el Vaso 2 solo o en interacción con los otros líquidos?",
            "En este experimento, ¿qué hace el líquido en el Vaso 3 solo o en interacción con los otros líquidos?",
            "En este experimento, ¿qué hace el líquido en el Vaso 4 solo o en interacción con los otros líquidos?"
        ];

        let answers = questions.map(question => prompt(question));
        
        if (answers.includes("")) {
            alert("POR FAVOR RESPONDE TODAS LAS PREGUNTAS. SI NO SABES UNA RESPUESTA, POR FAVOR ESCRIBE 'NO LO SÉ'.");
        } else {
            alert("Gracias por tus respuestas.");
            window.location.href = "survey.html"; // Redirige al cuestionario de la encuesta
        }
    }

    startButton.addEventListener("click", function() {
        page1.style.display = "none";
        page2.style.display = "block";
        handleEmpty(largeBeaker2);
    });

    glasses.forEach(glass => {
        glass.addEventListener("click", function() {
            handleGlassClick(glass);
        });
    });

    confirmButton.addEventListener("click", function() {
        handleConfirmSelection(largeBeaker2, true);
    });

    emptyButton.addEventListener("click", function() {
        handleEmpty(largeBeaker2);
    });

    giveUpButton.addEventListener("click", handleGiveUp);

    confirmButton3.addEventListener("click", function() {
        handleConfirmSelectionPage3(largeBeaker3);
    });

    emptyButton3.addEventListener("click", function() {
        handleEmpty(largeBeaker3);
    });

    giveUpButton3.addEventListener("click", handleGiveUp);

    iKnowButton.addEventListener("click", handleIKnow);
});
