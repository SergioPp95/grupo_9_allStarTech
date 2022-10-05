document.getElementById("myheader").innerHTML = 
   '<header> <img src="design/logo.png" alt="Logo AllTech" class="logo">'
   + '<nav> <ul class="nav-bar" style="list-style-type:none"> <li>PC</li> <li>Celulares</li> <li>Audio</li> <li>Periféricos</li> </ul> </nav>'
   + '<form action="/" method="get" class="form">'
   + '<input type="text" placeholder="Search.." id="search">'
   + '<button class="botton" type="submit"><i class="fa fa-search"></i></button> </form>'
   + '<a href="/productCart"><i class="fas fa-shopping-cart"></i></a>'
   + '<a href="/login"><i class="fas fa-user-circle"></i></a>'
   + ' </header>';

document.getElementById("myfooter").innerHTML = 
   ' <footer> <article> <div class="fa-2x"> <i class="far fa-credit-card"></i> </div>'
   + '<h3>Paga con tarjeta o en efectivo</h3> <p>En AllTech puedes pagar con tu tarjeta favorita</p>'
   + '</article> <article>'
   + '<div class="fa-2x"> <i class="fas fa-gift"></i> </div> <h3>Envío gratis desde los $2.500</h3>'
   + '<p>Solo por estar registrad@ en AllTech tienes envíos gratis en miles de productos. Es un beneficio de AllPoints.</p>'
   + '</article> <article>'
   + '<div class="fa-2x"> <i class="fas fa-user-lock"></i> </div> <h3>Seguridad, de principio a fin</h3>'
   + '<p>¿No te gusta? Devuelvelo! En AllTech, estás siempre protegid@ en todas tus compras.</p>'
   + '</article> <article>'
   + '<h3>Copyright ©2022 AllTech S.A.</h3> </article> </footer>'