jQuery( document ).ready( function($) {
    
    var gridItemArray = [
        {
            title: 'Milkyway',
            remark: 'or Give me a Hand',
            category: 'Space',
            img: 'images/1.jpg'
        },
        {
            title: 'Butterfly',
            remark: 'Go Fishing!',
            category: 'Insectings',
            img: 'images/2.jpg'
        },
        {
            title: 'Roses',
            remark: 'Millitary car',
            category: 'Flowers',
            img: 'images/3.jpg'
        },
        {
            title: 'Light House',
            remark: 'Game Graphic',
            category: 'Buildings',
            img: 'images/4.jpg'
        },
        {
            title: 'Wind Generator',
            remark: 'Millitary vihicle',
            category: 'Buildings',
            img: 'images/5.jpg'
        },
        {
            title: 'Fisher`s Boat',
            remark: 'car',
            category: 'Boats',
            img: 'images/6.jpg'
        },
        {
            title: 'Violet Rose',
            remark: 'Police car',
            category: 'Flowers',
            img: 'images/7.jpg'
        },
        {
            title: 'Jellyfish',
            remark: 'Usable icons',
            category: 'Fishes',
            img: 'images/8.jpg'
        },
        {
            title: 'Flowers',
            remark: 'Usable icons',
            category: 'Flowers',
            img: 'images/9.jpg'
        },
        {
            title: 'Univers',
            remark: 'Usable icons',
            category: 'Space',
            img: 'images/10.jpg'
        },
        {
            title: 'Flower',
            remark: 'Usable icons',
            category: 'Flowers',
            img: 'images/11.jpg'
        },
        {
            title: 'Butterfly',
            remark: 'Usable icons',
            category: 'Insectings',
            img: 'images/12.jpg'
        },
        {
            title: 'Baloon',
            remark: 'Usable icons',
            category: 'Aerial Rides',
            img: 'images/13.jpg'
        },
        {
            title: 'Yacht on River',
            remark: 'Usable icons',
            category: 'Boats',
            img: 'images/14.jpg'
        },
    ]
    
    // MARK UPS ---------------------------------------------------
    $.each(gridItemArray, function(index, value) {
        $('<div class="grid-item">')
            .appendTo('.masonry-grid')
        
            .append('<div class="grid-item-hover">')
            .append('<img class="grid-item-img">')
        
            .children('.grid-item-hover')
            .append('<p class="grid-item-title">')
            .append('<p class="grid-item-remark">')
            .append('<p class="grid-item-category">')
        
            .children('.grid-item-title')
            .text(value.title)
        
            .siblings('.grid-item-remark')
            .text(value.remark)
        
            .siblings('.grid-item-category')
            .text(value.category)
    });
    
    // SETTINGS ---------------------------------------------------
    var mobileColumns = 2; 
    var mobileColumnsWidth = 792; // 모바일 그리드로 변하는 max-width
    var tabletColumns = 3; 
    var tabletColumnsWidth = 1200; // 최대 그리드로 변하는 min-width
    // 데스크탑 Columns는 아래 howColomns() 함수에서 입력합니다.
    
    // VARIABLES ---------------------------------------------------
    var colomn;
    var colomnGap;
    var $gridItem = $('.grid-item');
    var $gridItemImg = $('.grid-item-img');
    var lightboxIndex = 0;
    var canClick = true;
    var $masonryGrid = $('.masonry-grid');
    var wrapWidth = $masonryGrid.width();
    
    // FUNCTIONS ---------------------------------------------------
    // 그리드 위치, 그림 등 삽입 함수
    function gridInit(colomn, colomnGap) {
        var positionY_arr = []; // 각 컬럼별 점차 누적되는 높이값
        var positionX_arr = []; // 
        var positionX_arrTotal = 0;
        wrapWidth = $masonryGrid.width();
        var itemWidth = ( wrapWidth - ( colomnGap * colomn - colomnGap )) / colomn ;
        
        for( i=0; i<colomn; i++ ) {
            // 창 너비 / 컬럼 수 계산해서 위치 값을 배열에 등록.
            positionX_arr[i] = positionX_arrTotal;
            positionX_arrTotal = positionX_arrTotal + colomnGap;
            positionX_arrTotal = positionX_arrTotal + itemWidth;

            // 컬럼 수 만큼의 배열 선언하기. x변수와 함께 사용.
            positionY_arr[i] = 0;
        }

        for( i=0; i<gridItemArray.length; i++ ) {
            // 각 아이템에게 이미지 삽입하고 너비 값 지정해주기
            $gridItemImg
                .eq(i)
                .css('width', itemWidth)
                .attr('src', gridItemArray[i].img);
        }

        setTimeout( function() {
            for( i = 0; i < gridItemArray.length; i++ ) {
                var nowColHeight = $gridItem.eq(i).height();
                var x = 0; 
                var sss = 0;
                
                // 변수 x에 가장 높이가 낮은 컬럼이 몇번째인지 값 담기.
                for ( j=0; j<colomn; j++ ) {
                    if( positionY_arr[x] > positionY_arr[j] ) {
                        x = j;
                    }
                }

                // 각 아이템에게 위치 지정해주기
                $gridItem.eq(i).css({ 
                        'left': positionX_arr[x], 
                        'top': positionY_arr[x],
                    });
                
                // 포지션Y 변수에 현재 이미지의 높이값 더하기.
                positionY_arr[x] = positionY_arr[x] + nowColHeight + colomnGap;
            }
        }, 10);
    }
    
    // gridInit 함수 실행 여부 결정하는 최초 함수
    function howColomns(classs, colomn, colomnGap) {
        var columnReact;
        
        // 반응형 설정
        if ( wrapWidth > tabletColumnsWidth ) {
            columnReact = colomn;
        }
        else if ( wrapWidth < mobileColumnsWidth ) {
            columnReact = mobileColumns;
        }
        else {
            columnReact = tabletColumns;
        }
        
        if ( colomn < columnReact) {
            columnReact = colomn;
        }
        
        var hasClass = $(classs).hasClass('masonry-wrapper');
        if ( hasClass == true ) {
            gridInit(columnReact, colomnGap);
        }
    }
    
    // 라이트박스 설정 함수
    function lightboxInit() {
        $('.masonry-lightbox-ui-img').attr('src', gridItemArray[lightboxIndex].img);

        setTimeout( function() {
            var imgWidth = $('.masonry-lightbox-ui-img').width();
            var imgHeight = $('.masonry-lightbox-ui-img').height();
            $('.masonry-lightbox-ui-interface').css('width', imgWidth );
            $('.masonry-lightbox-ui-interface').css('height', imgHeight );
        }, 10);

        $('.masonry-lightbox').removeClass('is-hidden');
        setTimeout( function() {
            $('.masonry-lightbox').css('opacity', 1);
        });
    }
    
    // 라이트박스에서 현재 몇번째 사진인지 우측하단 텍스트 삽입 함수
    function nowNumOfPicture(lightboxIndex) {
        var nowNumber = lightboxIndex + 1;
        var maxNumber = gridItemArray.length;
        $('.masonry-lightbox-ui-num-now').text(nowNumber);
        $('.masonry-lightbox-ui-num-max').text(maxNumber);
    } 
    
    // EVENTS ---------------------------------------------------
    // masonry-wrapper클래스와 같은 위치에 있는 클래스를 첫번째 인자로 전달합니다. 이 때, 클래스 이름은 페이지 제목을 알 수 있는 이름으로 합니다.
    // 두번째 인자 : 최대 컬럼 수 | 세번째 인자 : 컬럼 간격(픽셀)
    function startMasonryGrid() {
        howColomns('.page-location', 4, 20);
    }
    
    // 창크기 변경시 새로고침
    window.onresize = function() {
        $('.grid-item').css('transition', '.5s');
        startMasonryGrid();
    };

    window.onload = function () {
        startMasonryGrid();
    };
    
    // 라이트박스 배경 클릭시 사라짐
    $('.masonry-lightbox-bg').click( function() {
        var $this = $('.masonry-lightbox');
        
        $this.css('opacity', 0);
        setTimeout( function() {
            $this.addClass('is-hidden');
        }, 500);
        
    });
    
    // 그리드 아이템 클릭시 라이트박스 호출
    $('.grid-item').click( function() {
        var $this = $(this);
        lightboxIndex = $this.index();
        lightboxInit();
        nowNumOfPicture(lightboxIndex);
    });
    
    // 라이트박스 UI : 화살표 클릭시
    $('.masonry-lightbox-ui-arrow').click( function() {
        if (canClick == true) {
            canClick = false;
            var hasClass = $(this).hasClass('masonry-lightbox-ui-arrow-left');
            var moveSide = 30; // 좌, 우 버튼 클릭했을때 움직이는 애니메이션 거리
            
            if ( hasClass == true ) {
                if ( lightboxIndex < 1 ) {
                    lightboxIndex = gridItemArray.length;
                }
                moveSide = -50;
                lightboxIndex = lightboxIndex - 1;
            }

            else {
                if ( lightboxIndex >= gridItemArray.length - 1 ) {
                    lightboxIndex = -1;
                }
                lightboxIndex = lightboxIndex + 1;
            }

            $('.masonry-lightbox-ui').stop().animate({ 
                opacity: 0,
                left: -moveSide }, 500, function() {
                lightboxInit();
                $(this).animate({ left: moveSide }, 0, function() {
                    nowNumOfPicture(lightboxIndex);
                    $(this).animate({ opacity : 1, left: 0 }, 500, function() {
                        canClick = true;
                    });
                });
            });
        }
    });

    startMasonryGrid();
});