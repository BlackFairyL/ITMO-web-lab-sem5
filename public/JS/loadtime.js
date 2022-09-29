window.addEventListener('load',function()
{
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    document.getElementById('time').innerHTML = `Total time: ${loadTime}ms (client) + ${document.getElementById('time').innerHTML}`;
});
