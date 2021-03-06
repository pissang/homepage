(function() {
    angular.module('homepage.background', [])
        .run(function() {
            // Blur background image
            var canvas = document.getElementById("BackgroundCanvas")
            var processor = new emage.Processor(canvas);
            var blurLayer = new emage.Layer("buildin.boxblur");
            var blurLayer2 = new emage.Layer("buildin.boxblur");
            var blurLayer3 = new emage.Layer("buildin.boxblur");
            blurLayer.set('blurSize', 5);
            blurLayer2.set('blurSize', 5);
            blurLayer3.set('blurSize', 5);
            processor.add(blurLayer)
            processor.add(blurLayer2)
            processor.add(blurLayer3)

            var image = new Image;
            image.src = "imgs/storyboard-t.jpg";
            image.onload = function() {
                image.width = window.innerWidth;
                image.height = window.innerHeight * 1.5;
                processor.image = image
                processor.update()
            }

            // Parallax scroll
            var background = document.getElementById("Background");
            window.onscroll = function() {
                canvas.style.top = (-document.body.scrollTop * 0.1) + 'px';
            }
        });
})();