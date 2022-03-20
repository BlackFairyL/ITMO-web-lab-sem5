window.addEventListener('load',function()
{
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    document.getElementById('time').innerHTML = loadTime;
    document.getElementById('time').innerHTML += "ms";
});
