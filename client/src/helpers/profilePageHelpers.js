let example = {
  posts: {
    data: [
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p180x540/31403980_2091329964420069_1189914410114613248_o.jpg?_nc_cat=107&_nc_sid=dd9801&_nc_oc=AQljQfq-0n8rv9DKSbF_axzp9WPQsXe9u7oq9FbKA4ZJNuAjCoBiYdHuDpRcaUKTRZg&_nc_ht=scontent.xx&_nc_tp=6&oh=7babfb44e4b8a88ab3c52529c7dc55df&oe=5E944DED',
        id: '2469683036584758_2091330004420065'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t1.0-9/21230859_1980909718795428_1040661949399778643_n.jpg?_nc_cat=103&_nc_sid=85a577&_nc_oc=AQmPKSp89LMWmzvDuFHWFI_y9QKhj0C_P2LCOt0jefEvqFPDU2mmSzvbmVqhZxs7oTQ&_nc_ht=scontent.xx&oh=9b2ef8930918a4f71239fd9fc7952e3d&oe=5E98AA6F',
        id: '2469683036584758_1980909728795427'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t1.0-0/p180x540/19399083_10155657266590827_2342209036495898054_n.jpg?_nc_cat=100&_nc_sid=2d5d41&_nc_oc=AQm5OiyOot8OJml7kb59r9nVfHAIJXjh9Y-2OATUwMPVp2tv1IiMnM_L2y-67ObsJBM&_nc_ht=scontent.xx&_nc_tp=6&oh=7746002f5f715090a3120064e25da682&oe=5E930098',
        id: '2469683036584758_1947728175446916'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/15068944_1847487712137630_8708501220304109374_o.jpg?_nc_cat=105&_nc_sid=0be424&_nc_oc=AQnM-O7jhH6CT7Hlb-kF27urM53AuwM71ghdfr0MPzEWkm3nDIj1scop0K2EP6vsjGY&_nc_ht=scontent.xx&_nc_tp=7&oh=81eb391be00a48adb09e74d3c37228cb&oe=5E992BBB',
        message: 'Full size: http://imgur.com/a/nhN11',
        id: '2469683036584758_1847488498804218'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/15110332_1845753738977694_6234108057874314217_o.jpg?_nc_cat=104&_nc_sid=0be424&_nc_oc=AQmZZHaxuUbMWXLcds_q7J-uH-y4xCCnHkPQMuYPJc8DwmMfjNrXLNZigMOw825mJ7E&_nc_ht=scontent.xx&_nc_tp=7&oh=c8285096d65a334eefca438970ca4dbb&oe=5E8DFFAF',
        message: 'McGregor | Alvarez Full Size: http://imgur.com/a/Djefd',
        id: '2469683036584758_1845753802311021'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/14700843_1831414637078271_6620938074753727391_o.jpg?_nc_cat=110&_nc_sid=0be424&_nc_oc=AQmjDv8zG_tiIalFxZiRekhzEpYgzk-D1UNLgg7wSXzKOS-81Lu4JJUqpiRaPwTeMI8&_nc_ht=scontent.xx&_nc_tp=7&oh=8d196d60df19cc01a0dfbfce55f56227&oe=5E97D965',
        message: 'REUS Full size: http://imgur.com/a/sKliz',
        id: '2469683036584758_1831414693744932'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/14715561_1830153603871041_5014630723291189288_o.jpg?_nc_cat=108&_nc_sid=0be424&_nc_oc=AQlsdZn6-KfkZCLabwSElQfqHP9cLcuCKQyhEbiTYTduvendyi2J6ppzuEOh2-88Sw8&_nc_ht=scontent.xx&_nc_tp=7&oh=1e2fd3426fd88795049268d5c1f9e8e1&oe=5E9515DE',
        message:
          'These words are supposed to be simple But it seems thats not the case This page is staring back at me Im afraid to put a mark on its face Oh, Im just tryna introduce you To this idea that Ive grown used to Its like sharing a dream with someone Once you say it out loud, it cant be undone',
        id: '2469683036584758_1830153663871035'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/13938230_1803920759827659_7195572956975676073_o.jpg?_nc_cat=107&_nc_sid=0be424&_nc_oc=AQkhHA_YLjdo_9yxu71LmluYfkM-NZXXxOBCYs-Dtfigw2LKp2bw0Tn_TKkLNuAga-8&_nc_ht=scontent.xx&_nc_tp=7&oh=d8d280cadfd5d0ea1170723d27f18db1&oe=5E91F433',
        message:
          'CONOR. Made in Photoshop.Full sized pic: http://imgur.com/a/1Idgs',
        id: '2469683036584758_1803921626494239'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/13115932_1756326377920431_6416065858328154261_o.jpg?_nc_cat=110&_nc_sid=7aed08&_nc_oc=AQmLBqCU2kpAJwK8SHRtaF37pvwAWqMZmMneKPRfb-4mWyEh5CDfU1gufD-WitgP6xY&_nc_ht=scontent.xx&_nc_tp=7&oh=22bd97a32cfc4d2d5250e279ef73e3ef&oe=5EA70D61',
        id: '2469683036584758_1756326397920429'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/2545_1741168886102847_4712754264979049022_n.jpg?_nc_cat=102&_nc_sid=e007fa&_nc_oc=AQmZY3cYAMlLck6y__alkDXz4ddlAgYAQN4krDnPf5Ykt4NdGdrk9acI9M7gPh4zX4M&_nc_ht=scontent.xx&_nc_tp=7&oh=4ef7b2fda869f69fd5298d7de720c4dd&oe=5E973955',
        message: 'Full Size - http://i.imgur.com/HXiMdJE.jpg',
        id: '2469683036584758_1741168886102847'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/12487084_1716983258521410_8816246495107929599_o.jpg?_nc_cat=104&_nc_sid=05277f&_nc_oc=AQlbEh0_-coiKm5naoHMSpGa4PgEjszuehqqORd5KrXgwxiVgv2WrRpVr9K4C6kLwKw&_nc_ht=scontent.xx&_nc_tp=7&oh=37e3f282839013515622f6f776b17b7c&oe=5E939346',
        message: 'Croatian Water',
        id: '2469683036584758_1716983401854729'
      },
      {
        full_picture:
          'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/12391271_1707893996097003_322920784574960332_n.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_oc=AQlcDCmRyaOx50x3g0pYvK9e_UOUm-6oX7AgD7iP5R8yIscnjnUSCLyqoZw8B9W4T-g&_nc_ht=scontent.xx&_nc_tp=7&oh=a2ec10a49541a7da51ab760b0a46c8b4&oe=5E8D7B79',
        id: '2469683036584758_1707894029430333'
      }
    ],
    paging: {
      previous:
        'https://graph.facebook.com/v5.0/2469683036584758/posts?format=json&fields=full_picture,message&since=1524953261&access_token=EAAFlZAXHF9sUBANMmNvxtsGwlDIoVbtliIGHUKbokYxBCbHCEnwWZA67OA5D8YXIIZC9JNqSx5jGcEAUcmoRugpme8OMPCNbPlNctZCsJVFOUjdXklCOQGPKaZBDfAtfd0hArVeeGK59RvuC1rZCDsSgIEfYDInOO9tXfmHbS4Q0qhNbLuzpNAHZAFdalX5CxZBftzXtc6nA3NYI2rFIIjyn&limit=25&__paging_token=enc_AdAnmyJSLwFDkbuBuUCP27wbLtphsdhUtCmNR56rXvDKARHhAaWCAxdQ3QwudI2D8a7BuB9JFWXZCXlwLVbZCixtKsaIhoZAxwHW4T6ybPyF7vBSAZDZD&__previous=1',
      next:
        'https://graph.facebook.com/v5.0/2469683036584758/posts?format=json&fields=full_picture,message&access_token=EAAFlZAXHF9sUBANMmNvxtsGwlDIoVbtliIGHUKbokYxBCbHCEnwWZA67OA5D8YXIIZC9JNqSx5jGcEAUcmoRugpme8OMPCNbPlNctZCsJVFOUjdXklCOQGPKaZBDfAtfd0hArVeeGK59RvuC1rZCDsSgIEfYDInOO9tXfmHbS4Q0qhNbLuzpNAHZAFdalX5CxZBftzXtc6nA3NYI2rFIIjyn&limit=25&until=1450832565&__paging_token=enc_AdCDufKJMquZBhsm6uCbIAZCmsRLHS0ApfkdSZAhUb79jZAyJpeyMlYwxnUwNzsVPliYHLCAbCDdtY0mZCpnGNb05wmfWPZBqwTiBewXGtHgfchjj6sAZDZD'
    }
  },
  photos: {
    data: [
      {
        images: [
          {
            height: 2015,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&oh=40ab217028b2e48f364b3e7d89617238&oe=5E944020',
            width: 1511
          },
          {
            height: 1280,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/p960x960/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=775fd81dba8ac43429a3be248eeff584&oe=5E8F03F5',
            width: 960
          },
          {
            height: 960,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/p720x720/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=c99de5e6bf27865b0fb39fb5aec7439c&oe=5E8F12EC',
            width: 720
          },
          {
            height: 800,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=563de14f300e4140ec2fb2cb93eb68ed&oe=5E950900',
            width: 600
          },
          {
            height: 640,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p480x480/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=2743aa9b4aa77055d3402847964f61c9&oe=5E94CC29',
            width: 480
          },
          {
            height: 427,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p320x320/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=99fce12ed20d49e0405072232a443a51&oe=5E8FDB6E',
            width: 320
          },
          {
            height: 540,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p180x540/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=b3c4a8478c3ed35d3d1e3ca0ff00bc3d&oe=5E962625',
            width: 405
          },
          {
            height: 173,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p130x130/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=b41dfc24169fece189ab31921238dcef&oe=5E987E89',
            width: 130
          },
          {
            height: 224,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p168x128/23550340_1457043771076213_8411272780057508639_o.jpg?_nc_cat=104&_nc_sid=dd9801&_nc_oc=AQlwhMa4y7kCEwPiGXHytYXQCRkVCHkS-f5aYFUN0PDRAQ5zV3rfskPzZaS0wJczBmE&_nc_ht=scontent.xx&_nc_tp=6&oh=1b5a8f5c947a3bd4881b406c66e8348d&oe=5E8F790B',
            width: 168
          }
        ],
        id: '1457043771076213'
      },
      {
        images: [
          {
            height: 1152,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&oh=3da338f182b76044058d5ac5cebbb5a5&oe=5E97D3D3',
            width: 864
          },
          {
            height: 960,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/p720x720/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=b65b8aa6e25f2955ab399e83625b9bda&oe=5E94901F',
            width: 720
          },
          {
            height: 800,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=f4a7bc5753fdcdbe266a8db103e95b8b&oe=5E91D4F3',
            width: 600
          },
          {
            height: 640,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p480x480/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=4c94dad259b344a8a6cb813a3979be79&oe=5E9795DA',
            width: 480
          },
          {
            height: 427,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p320x320/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=62e7553f690e1556b4174780afc52f68&oe=5E98F69D',
            width: 320
          },
          {
            height: 540,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p180x540/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=f386ed64ae64415be805d96acfd74e78&oe=5E983FD6',
            width: 405
          },
          {
            height: 173,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p130x130/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=4f4ec36fa9e601aa5680d3b5804137b0&oe=5E97CD7A',
            width: 130
          },
          {
            height: 225,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p75x225/13661867_1085888694839371_3785540233223150804_o.jpg?_nc_cat=109&_nc_sid=e007fa&_nc_oc=AQk4ZzTOmOYP_q-mLkshwYU5Dc07UHHRDmUy8c5WuS0PqbRQCHH3wARIX5RwQ5du0Ec&_nc_ht=scontent.xx&_nc_tp=6&oh=12ebafa3d5e01162de0b67fd4297a9cf&oe=5E8EDEDD',
            width: 169
          }
        ],
        id: '1085888694839371'
      },
      {
        images: [
          {
            height: 1280,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-8/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&oh=42675cce79d359b59d17a5fb187f5349&oe=5E97CF53',
            width: 720
          },
          {
            height: 1067,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p600x600/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=9aee4d353d8c8d6e201598610fd8f567&oe=5E8FDA73',
            width: 600
          },
          {
            height: 853,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p480x480/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=913db92bc8d7fc5161e44a2def43be1e&oe=5E8DBB26',
            width: 480
          },
          {
            height: 569,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p320x320/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=ee77c66b8258c24c58b8273bc86c7145&oe=5E94241D',
            width: 320
          },
          {
            height: 540,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p180x540/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=2f6927e35e593f653a169f4916179804&oe=5E90B056',
            width: 304
          },
          {
            height: 231,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p130x130/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=8548e9b8a18a9fdf7746aead41d03518&oe=5E8ECDFA',
            width: 130
          },
          {
            height: 225,
            source:
              'https://scontent.xx.fbcdn.net/v/t31.0-0/p75x225/13268115_1734997100104462_4145787615353109970_o.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_oc=AQnMU4gD7OKPWq5imNpEU3yW6o6zcVi4M9iikb33K9bZBz_8K43mrbJo3h5wpXCFh0A&_nc_ht=scontent.xx&_nc_tp=6&oh=904d427cbbe3b46ec6ae4d9995ac58a5&oe=5E93C75D',
            width: 127
          }
        ],
        id: '1734997100104462'
      }
    ],
    paging: {
      cursors: {
        before:
          'QVFIUllZARW96eFR1bHZAULV8xOElLXzY2c2RkaTVtR0JSYzVPUnUtallvT3p3UGxlQXU3R0lXWks1QjhfOFBVS3ZAaeDVsOGc0anVfcnVtQ0huekxmWnNiTTlB',
        after:
          'QVFIUnhrRWRseEtybURiTkp1X0NBbmprZAnp6bnNCR0ZA4MkFYampwbzFvZA3k1UXZAJOWRuS2lpRFRtOHQ1WFR2Mlh6aXdheEczdnNWTjdWY1ZA2enRJcXFucXp3'
      }
    }
  },
  id: '2469683036584758'
};

export const parseFacebookResults = response => {
  let cleanedResults = { photos: [], text: [], site: 'facebook' };

  example.posts.data.forEach(post => {
    if (post['full_picture']) {
      cleanedResults.photos.push(post['full_picture']);
    }

    if (post['message']) {
      cleanedResults.text.push(post['message']);
    }
  });

  example.photos.data.forEach(photo => {
    cleanedResults.photos.push(photo.images[0].source);
  });

  console.log(cleanedResults);
  return cleanedResults;
};
