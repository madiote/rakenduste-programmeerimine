// Search something in ebay and copy this to console

// needs scope
{
    const itemContainerClass = "s-item   ";
    const imageClass = "s-item__image-img";
    const titleClass = "s-item__title";
    const priceClass = "s-item__price";

    const items = document.getElementsByClassName(itemContainerClass);
    
    const arr = [];

    Array.from(items).forEach(item => {
        const imgs = item.getElementsByClassName(imageClass);
        if (imgs.length === 0) return; // skip ones with zero
        const img = imgs[0];

        const src = img.dataset.src;
        if(!src) return;

        const title = item.getElementsByClassName(titleClass)[0].textContent;        
        const price = item.getElementsByClassName(priceClass)[0].textContent;

        arr.push({
            imgSrc: src,
            title,
            price,
            category: document.title.split("|")[0].trim()
        })
    });

    console.log(JSON.stringify(arr));
}