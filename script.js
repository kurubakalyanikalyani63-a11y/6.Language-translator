async function translateText() {

    const inputText = document.getElementById("inputText").value.trim();
    const fromLanguage = document.getElementById("fromLanguage").value;
    const toLanguage = document.getElementById("toLanguage").value;

    const outputText = document.getElementById("outputText");
    const status = document.getElementById("status");

    if (inputText === "") {
        alert("Please enter some text!");
        return;
    }

    if (fromLanguage === toLanguage) {
        outputText.value = inputText;
        return;
    }

    outputText.value = "";
    status.innerText = "Translating...";

    try {

        const url =
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLanguage}|${toLanguage}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network error");
        }

        const data = await response.json();

        if (data.responseData && data.responseData.translatedText) {
            outputText.value = data.responseData.translatedText;
            status.innerText = "Translation completed!";
        } else {
            outputText.value = "Translation not available.";
            status.innerText = "";
        }

    } catch (error) {
        console.error(error);
        outputText.value = "Unable to translate. Please check your internet connection.";
        status.innerText = "";
    }
}


function swapLanguages() {

    const from = document.getElementById("fromLanguage");
    const to = document.getElementById("toLanguage");

    const temp = from.value;
    from.value = to.value;
    to.value = temp;

    const input = document.getElementById("inputText");
    const output = document.getElementById("outputText");

    const tempText = input.value;
    input.value = output.value;
    output.value = tempText;
}