
const puppeteer = require("puppeteer-extra")

const StealthPlugin = require("puppeteer-extra-plugin-stealth")
puppeteer.use(StealthPlugin())
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time);
    });
}
async function openai(){

    const browser = await puppeteer.launch({headless: false ,executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'})
    const page= await browser.newPage()
    await page.goto("https://chatgpt.com/chat")
    await delay(5000)
    const button = await page.waitForSelector("#prompt-textarea")
    await delay(3000)
    await button.type("Hello")
    await delay(5000)
await page.keyboard.press("Enter")
await delay(5000)
const value = await page.evaluate(() => {
    const pElements = document.querySelector('#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div > main > div.flex.h-full.flex-col.focus-visible\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div > div:nth-child(3) > div > div > div.group\/conversation-turn.relative.flex.w-full.min-w-0.flex-col.agent-turn > div.flex-col.gap-1.md\:gap-3 > div.flex.flex-grow.flex-col.max-w-full > div > div > p'); // Select the <p> element
    if (pElements) {
        return pElements.textContent.trim(); // Get the text content of the <p> element
    }
});

if (value !== null) {
    console.log("Textarea value:", value);
} else {
    console.log("Textarea not found");
}

}
openai()