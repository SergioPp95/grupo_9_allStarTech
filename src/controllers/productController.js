const fs = require ('fs');
const path = require ('path');

const productsPath = path.join(__dirname, '../data/products.json')
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))



/*let products = [
  {
    id: 1,
    name: "MOTHER GIGABYTE B660M AORUS PRO DDR4 S1700",
    description:
      "Intel® B660 AORUS Motherboard with 12*+1+1 Twin Hybrid Phases Digital VRM Design, Fully Covered Thermal Design , 2 x PCIe 4.0 M.2 with Thermal Guard, Intel® 2.5GbE LAN, Rear USB 3.2 Gen 2x2 Type-C®, RGB FUSION 2.0, Q-Flash Plus",
    price: "51.490,00",
    priceMP: '66.937,00',
    priceCuotas: '6.865,33',
    imagenPrincipal: "/images/mother-aorus1.jpg",
    imagenSecundaria: "/images/mother-aorus2.jpg",
  },
  {
    id: 2,
    name: 'NOTEBOOK LENOVO 15.6" V15 I5-1135G7 8GB 256GB FREE',
    description:
      "Modelo Lenovo V15 IIL, Procesador Intel Core i5-1135G7, Graficos Integrated Intel UHD Graphics",
    price: "174.860,00",
    priceMP: '227.318,00',
    priceCuotas: '23.314,66',
    imagenPrincipal: "/images/lenovo-1.jpg",
    imagenSecundaria: "/images/lenovo-2.jpg",
  },
  {
    id: 3,
    name: "VIDEO GEFORCE RTX 3080 10GB MSI GAMING Z TRIO LHR ",
    description: "Núcleos 8704 Unidades, Velocidad clock núcleo (MHz) Boost: 1830 MHz, Resolución máxima digital 7680x4320",
    price: "294.030,00",
    priceMP: '382.239,00',
    priceCuotas: '39204,00',
    imagenPrincipal: "/images/geforce-1.jpg",
    imagenSecundaria: "/images/geforce-2.jpg",
  },
  {
    id: 4,
    name: "MONITOR 24 SAMSUNG LED IPS T350 FULL HD 75HZ FREESYNC",
    description: "Modelo Samsung F24T350FHL, panel IPS, 75MHZ",
    price: "48.200,00",
    priceMP: '62.660,00',
    priceCuotas: '6.426,66',
    imagenPrincipal: "/images/monitor-1.jpg",
    imagenSecundaria: "/images/monitor-2.jpg",
  },
  {
    id: 5,
    name: "AURICULARES CORSAIR GAMING HS35 GREEN ",
    description: "Compatibilad con PC, PS4, XBOX One, Nintendo Switch & Mobile devices",
    price: "11.730,00",
    priceMP: '15.249,00',
    priceCuotas: '1.564,00',
    imagenPrincipal: "/images/corsair-1.jpg",
    imagenSecundaria: "/images/corsair-2.jpg",
  },
  {
    id: 6,
    name: "PC AMD RYZEN 5 5600G+A320+16GB+480GB",
    description: "PC con procesadord AMD RYZEN 5 5600G, Motherboard A320AM4, Memoria Ram 3200mhz DDR4 8GB & Disco SSD 480GB",
    price: "92.440.00",
    priceMP: '120.172,00',
    priceCuotas: '12.325,33',
    imagenPrincipal: "/images/pc-completa-1.jpg",
    imagenSecundaria: "/images/pc-completa-1.jpg",
  },
  {
    id: 7,
    name: "SAMSUNG GALAXY Z FLIP 3",
    description: "Celular Samsung galaxy Z Flip 3 color Violeta",
    price: "150.340,00",
    priceMP: '195.442,00',
    priceCuotas: '20.045,33',
    imagenPrincipal: "/images/galaxy-flip-3.jpg",
    imagenSecundaria: "/images/galaxy-flip-3.jpg",
  },
  {
    id: 8,
    name: "TECLADO HP HYPERX ALLOY ORIGINS 65 MECANICO 4P5D6AA",
    description: "Teclado mecanico HyperX 65% red Switches",
    price: "13.990,00",
    priceMP: '18.187.00',
    priceCuotas: '1.865,33',
    imagenPrincipal: "/images/teclado-1.jpg",
    imagenSecundaria: "/images/teclado-2.jpg",
  },
];
*/


const controller = {
  index: (req, res) => {
    res.render('./products/products', { products })
  },
  create: (req, res) => {
    res.render('./products/product-create')
    // Codigo
  },
  store: (req, res) => {
    // Codigo
    res.redirect('/products/' + req.params.id)
  },
  detail: (req, res) => {
    /*let product = products.find( (elem) => elem.id == req.params.id );*/
    let id = req.params.id
    let product = products.find(product => {
      return product.id == id
    })
    res.render('./products/product-detail', { product })
  },
  edit: (req, res) => {
    // Codigo
    const product = products.find(element => element.id == req.params.id)

    res.render('./products/product-edit', { product })
  },
  update: (req, res) => {
   
   // Filtra producto a editar
   const product = products.find(element => element.id == req.params.id)
   
   // Elimina imagenes anteriores del producto
   fs.unlinkSync(path.join(__dirname, "../../public/images", product.imageMain))
   fs.unlinkSync(path.join(__dirname, "../../public/images", product.imageOther))

   // Asigna nuevos valores a cada atributo
   product.id = req.body.id
   product.name = req.body.name
   product.description = req.body.description
   product.imageMain = req.file.filename
   product.imageOther = req.files.image1.filename
   product.category = req.files.image2.filename
   product.price = req.body.price
   product.discount = req.body.discount

   // Reescribe archivo json
   fs.writeFileSync(productsPath, JSON.stringify(products));

   // Reenvia a página del producto recién editado
    res.redirect('/products/' + req.params.id)
  },
  delete: (req, res) => {
    // Codigo
    const id = req.params.id
    let productsFiltered = products.filter(element => element.id != id)

    // fs.writefilesync

    res.redirect('/products/')
  },
}

module.exports = controller;


