var xhr= new XMLHttpRequest();
xhr.open('GET', 'portfolio-section.html', true);
xhr.onreadystatechange= function() {
    if (this.readyState!==4) return;
    if (this.status!==200) return; // or whatever error handling you want
    document.getElementById('portfolio-section').innerHTML= this.responseText;
};
xhr.send();
