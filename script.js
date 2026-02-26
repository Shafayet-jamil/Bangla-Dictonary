

const searchBtn = document.querySelector('.searchButton');
let input = document.querySelector('.inputWord');
let outputField = document.querySelector('.output-field');

//what to do when enter key
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
}
);

searchBtn.addEventListener('click', search);

//here is the main search function with fetch api

async function search() {
    const word = input.value.trim();
    if (!word) return;

    showLoading() // this is optional

    try {
        //get the result of the api
        const dictonaryResult = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
        if (!dictonaryResult.ok) {
            showError(word);
            return;
        }
        const dictonaryData = await dictonaryResult.json();
  //here is the definition of the word and now we will translate it to bangla using another api
        const defText = dictonaryData[0].meanings[0].definitions[0].definition;
        //now translating the word from another api

        const translateResult = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(defText)}&langpair=en|bn`);
        const translationData = await translateResult.json();
        const bangla = translationData.responseData?.translatedText || 'অনুবাদ পাওয়া যায়নি।';

        showResult(dictonaryData, bangla, word);
    }
    catch (err) {
        showError(word);
        console.error(err);
    }

}

function showLoading() {
    outputField.innerHTML = `
    <div class="card">
     <div class="loading">
        <div class="spinner">
        Searching...</div>
     </div>
    </div>
    `;
}
  
function showResult(dictonaryData, bangla, word) {
   const entry = dictonaryData[0];
   const phonetic = entry.phonetic || 'N/A';
   const firstMeaning = entry.meanings[0]; 
   const partOfSpeech = firstMeaning.partOfSpeech; 
   const definition = firstMeaning.definitions[0].definition; 
   const example = firstMeaning.definitions[0].example || ''; 
 //now create  html to inject the data from here

 outputField.innerHTML = `
   <div class= "card">
   <h2> ${word} <span class="phonetic"> /${phonetic}/ </span> </h2>
   <p class="part-of-speech"> ${partOfSpeech} </p>
   <p class="definition"> ${definition} </p>
   ${example ? `<p class= "example"> Example: ${example} </p>` : ''}
   <hr/>
   <p class="translation"> Bangla: ${bangla} </p> 
   </div>`; 

}


function showError(word) {
    outputField.innerHTML = `
    <div class="card">
    <div class="error">IMOGI</div>
    <div class="error"> NOT FOUND </div>
     <div class="error"> 
       <p>Word "${word}" not found in the dictionary.</p>
     </div>
    </div> `;
}

    
// outputField.style.display = "flex";
// outputField.style.justifyContent = "center";
// outputField.style.alignItems = "center";
// p.style.textAlign = "center";
// p.style.fontSize = "24px";
