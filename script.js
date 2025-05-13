const button_dark_mode = document.getElementById("button-dark-mode");

button_dark_mode.addEventListener('click', e=>{
    toggleDarkMode();
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') 
{
    document.body.classList.add('dark-mode');
}
else 
{
    document.body.classList.remove('dark-mode');
}

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) 
    {
        localStorage.setItem('theme', 'dark');
    } 
    else 
    {
        localStorage.setItem('theme', 'light');
    }
}