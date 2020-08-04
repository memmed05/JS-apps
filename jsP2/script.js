let models = [{
        name: 'BMW',
        image: 'img/bmw.jpg',
        link: 'https://www.google.az/'
    },
    {
        name: 'Honda',
        image: 'img/honda.jpg',
        link: 'https://www.google.az/'
    },
    {
        name: 'Mazda',
        image: 'img/mazda.jpg',
        link: 'https://www.google.az/'
    },
    {
        name: 'Skoda',
        image: 'img/skoda.jpg',
        link: 'https://www.google.az/'
    },
    {
        name: 'Volvo',
        image: 'img/volvo.jpg',
        link: 'https://www.google.az/'
    }
];

let index = 0;
let count = models.length;
let settings = {
    duration: '1000',
    random: false
};
let interval;

init(settings);

document.querySelector('.fa-arrow-circle-left').addEventListener('click', function () {
    index--;
    showSlide(index);
});
document.querySelector('.fa-arrow-circle-right').addEventListener('click', function () {
    index++;
    showSlide(index);
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval);
    });
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    });
});

function init(settings) {

    let prev;
    interval=setInterval(function () {
        if (settings.random) {
            do {
                index = Math.floor(Math.random() * count);
            } while (index == prev)
            prev = index;
        } else {
            if (index + 1 == count) {
                index = 0;
            } else {
                index++;
            }
        }
        showSlide(index);


    }, settings.duration);


}




function showSlide(i) {
    index = i;
    if (i < 0) {
        index = count - 1;
    } else if (i >= count) {
        index = 0;
    }

    document.querySelector('.card-title').textContent = models[index].name;
    document.querySelector('.card-link').setAttribute('href', models[index].link);
    document.querySelector('.card-img-top').setAttribute('src', models[index].image);
}