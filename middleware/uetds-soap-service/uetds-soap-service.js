const axios = require('axios');
const parser = require('fast-xml-parser');

const username = '999999';
const password = '999999testtest';

const url = 'https://servis.turkiye.gov.tr/services/g2g/kdgm/test/uetdsarizi?wsdl';

const soapServer = axios.create({
    method: 'POST',
    headers: { 'Content-Type': 'text/xml' },
    auth: { username: username, password: password }
});


/***
 * @param {Object} seferEkleObject [aracPlaka*,hareketTarihi*,hareketSaati*,seferAciklama,aracTelefonu,firmaSeferNo,seferBitisTarihi*,seferBitisSaati*]
 * let seferEkleObject = { aracPlaka: "48E2880", seferAciklama: "", hareketTarihi: "2021-09-24", hareketSaati: "06:00", aracTelefonu: "", firmaSeferNo: "", seferBitisTarihi: "2021-09-24", seferBitisSaati: "06:00"}
 * @return {Object} 
 */
const seferEkle = async (seferEkleObject) => {
    console.log(seferEkleObject);
    if (typeof seferEkleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferEkle>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <ariziSeferBilgileriInput>
                    <aracPlaka>`+ seferEkleObject.aracPlaka + `</aracPlaka>
                    <!--Optional:-->
                    <seferAciklama>`+ seferEkleObject.seferAciklama + `</seferAciklama>
                    <hareketTarihi>`+ seferEkleObject.hareketTarihi + `</hareketTarihi>
                    <hareketSaati>`+ seferEkleObject.hareketSaati + `</hareketSaati>
                    <!--Optional:-->
                    <aracTelefonu>`+ seferEkleObject.aracTelefonu + `</aracTelefonu>
                    <firmaSeferNo>`+ seferEkleObject.firmaSeferNo + `</firmaSeferNo>
                    <seferBitisTarihi>`+ seferEkleObject.seferBitisTarihi + `</seferBitisTarihi>
                    <seferBitisSaati>`+ seferEkleObject.seferBitisSaati + `</seferBitisSaati>
                </ariziSeferBilgileriInput>
            </uet:seferEkle>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferEkleResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferGuncelleObject [aracPlaka*,hareketTarihi*,hareketSaati*,seferAciklama,aracTelefonu,firmaSeferNo,seferBitisTarihi*,seferBitisSaati*]
 * let seferGuncelleObject = { guncellenecekSeferReferansNo:"21011460312292",aracPlaka: "48E2880", seferAciklama: "", hareketTarihi: "2021-09-24", hareketSaati: "06:00", aracTelefonu: "", firmaSeferNo: "", seferBitisTarihi: "2021-09-24", seferBitisSaati: "06:00"}
 * @return {Object} 
 */
const seferGuncelle = async (seferGuncelleObject) => {
    if (typeof seferGuncelleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferGuncelle>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <guncellenecekSeferReferansNo>`+ seferGuncelleObject.guncellenecekSeferReferansNo + `</guncellenecekSeferReferansNo>
                <!--Optional:-->
                <ariziSeferBilgileriInput>
                    <aracPlaka>`+ seferGuncelleObject.aracPlaka + `</aracPlaka>
                    <!--Optional:-->
                    <seferAciklama>`+ seferGuncelleObject.seferAciklama + `</seferAciklama>
                    <hareketTarihi>`+ seferGuncelleObject.hareketTarihi + `</hareketTarihi>
                    <hareketSaati>`+ seferGuncelleObject.hareketSaati + `</hareketSaati>
                    <!--Optional:-->
                    <aracTelefonu>`+ seferGuncelleObject.aracTelefonu + `</aracTelefonu>
                    <firmaSeferNo>`+ seferGuncelleObject.firmaSeferNo + `</firmaSeferNo>
                    <seferBitisTarihi>`+ seferGuncelleObject.seferBitisTarihi + `</seferBitisTarihi>
                    <seferBitisSaati>`+ seferGuncelleObject.seferBitisSaati + `</seferBitisSaati>
                </ariziSeferBilgileriInput>
            </uet:seferGuncelle>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferGuncelleResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferIptal [uetdsSeferReferansNo*,iptalAciklama*]
 * let seferIptal = { uetdsSeferReferansNo: "21011460310166",iptalAciklama: "iptalAciklama gelecek" }
 * @return {Object} 
 */
const seferIptal = async (seferIptalObject) => {
    if (typeof seferIptalObject == "object") {

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
            <soapenv:Header/>
            <soapenv:Body>
            <uet:seferIptal>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferIptalObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <iptalAciklama>`+ seferIptalObject.iptalAciklama + `</iptalAciklama>
            </uet:seferIptal>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferIptalResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferIptal [uetdsSeferReferansNo*,tasitPlakaNo*]
 * let seferIptal = { uetdsSeferReferansNo: "21011460310166",tasitPlakaNo: "48E2880" }
 * @return {Object} 
 */
const seferPlakaDegistir = async (seferPlakaDegistirObject) => {
    if (typeof seferPlakaDegistirObject == "object") {

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
            <soapenv:Header/>
            <soapenv:Body>
            <uet:seferPlakaDegistir>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferPlakaDegistirObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <tasitPlakaNo>`+ seferPlakaDegistirObject.tasitPlakaNo + `</tasitPlakaNo>
            </uet:seferPlakaDegistir>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferPlakaDegistirResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferAktif [uetdsSeferReferansNo*,aktifAciklama]
 * let seferAktif = { uetdsSeferReferansNo: "21011460310166",aktifAciklama: "sefer aktif oldu" }
 * @return {Object} 
 */
const seferAktif = async (seferAktifObject) => {
    if (typeof seferAktifObject == "object") {

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
            <soapenv:Header/>
            <soapenv:Body>
            <uet:seferAktif>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferAktifObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <aktifAciklama>`+ seferAktifObject.aktifAciklama + `</aktifAciklama>
            </uet:seferAktif>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferAktifResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} personelEkle [uetdsSeferReferansNo*,turKodu,uyrukUlke,tcKimlikPasaportno*,cinsiyet,adi*,soyadi*,telefon,adres,hesKodu]
 * let personelEkleObject = {uetdsSeferReferansNo: "21011460312292",turKodu: "0",uyrukUlke: "TR",tcKimlikPasaportno: "11111111111",cinsiyet: "E",adi: "RIDVAN",soyadi: "ÇAKIR",telefon: "",adres: "",hesKodu: ""}
 * @return {Object} 
 */
const personelEkle = async (personelEkleObject) => {
    if (typeof personelEkleObject == "object") {
        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:personelEkle>
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <uetdsSeferReferansNo>`+ personelEkleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
              <!--1 or more repetitions:-->
              <seferPersonelBilgileriInput>
                 <turKodu>`+ personelEkleObject.turKodu + `</turKodu>
                 <uyrukUlke>`+ personelEkleObject.uyrukUlke + `</uyrukUlke>
                 <tcKimlikPasaportNo>`+ personelEkleObject.tcKimlikPasaportno + `</tcKimlikPasaportNo>
                 <cinsiyet>`+ personelEkleObject.cinsiyet + `</cinsiyet>
                 <adi>`+ personelEkleObject.adi + `</adi>
                 <soyadi>`+ personelEkleObject.soyadi + `</soyadi>
                 <!--Optional:-->
                 <telefon>`+ personelEkleObject.telefon + `</telefon>
                 <!--Optional:-->
                 <adres>`+ personelEkleObject.adres + `</adres>
                 <!--Optional:-->
                 <hesKodu>`+ personelEkleObject.hesKodu + `</hesKodu>
              </seferPersonelBilgileriInput>
           </uet:personelEkle>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:personelEkleResponse']['return'];
        return data;
    }
}


/***
 * @param {Object} personelIptal [uetdsSeferReferansNo*,personelTCKimlikPasaportNo*,iptalAciklama]
 * let personelIptalObject = {uetdsSeferReferansNo: "21011460312292",personelTCKimlikPasaportNo: "11111111111",iptalAciklama:""}
 * @return {Object} 
 */
const personelIptal = async (personelIptalObject) => {
    if (typeof personelIptalObject == "object") {

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:personelIptal>
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <iptalPersonelInput>
            <personelTCKimlikPasaportNo>`+ personelIptalObject.personelTCKimlikPasaportNo + `</personelTCKimlikPasaportNo>
                <!--Optional:-->
                <iptalAciklama>`+ personelIptalObject.iptalAciklama + `</iptalAciklama>
                <uetdsSeferReferansNo>`+ personelIptalObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
            </iptalPersonelInput>
           </uet:personelIptal>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:personelIptalResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} yolcuEkle [uetdsSeferReferansNo*,uyrukUlke*,tcKimlikPasaportNo*,cinsiyet*,adi*,soyadi*,koltukNo,telefonNo,grupId*]
 * let yolcuEkleObject = {uetdsSeferReferansNo: "21011460312742",uyrukUlke: "TR",tcKimlikPasaportNo: "11111111111",cinsiyet: "",adi: "okan",soyadi: "cemsiz",koltukNo: "",telefonNo: "",grupId: "113801",        hesKodu: ""    }
 * @return {Object} 
 */
const yolcuEkle = async (yolcuEkleObject) => {
    if (typeof yolcuEkleObject == "object") {

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:yolcuEkle>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <uetdsSeferReferansNo>`+ yolcuEkleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
              <!--Optional:-->
              <seferYolcuBilgileriInput>
                 <uyrukUlke>`+ yolcuEkleObject.uyrukUlke + `</uyrukUlke>
                 <tcKimlikPasaportNo>`+ yolcuEkleObject.tcKimlikPasaportNo + `</tcKimlikPasaportNo>
                 <!--Optional:-->
                 <cinsiyet>`+ yolcuEkleObject.cinsiyet + `</cinsiyet>
                 <adi>`+ yolcuEkleObject.adi + `</adi>
                 <soyadi>`+ yolcuEkleObject.soyadi + `</soyadi>
                 <koltukNo>`+ yolcuEkleObject.koltukNo + `</koltukNo>
                 <!--Optional:-->
                 <telefonNo>`+ yolcuEkleObject.telefonNo + `</telefonNo>
                 <grupId>`+ yolcuEkleObject.grupId + `</grupId>
                 <!--Optional:-->
                 <hesKodu>`+ yolcuEkleObject.hesKodu + `</hesKodu>
              </seferYolcuBilgileriInput>
           </uet:yolcuEkle>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yolcuEkleResponse']['return'];

        return data;
    }
}

/***
 * @param {Array} yolcuEkleCoklu [uetdsSeferReferansNo*,uyrukUlke*,tcKimlikPasaportNo*,cinsiyet*,adi*,soyadi*,koltukNo,telefonNo,grupId*]
 * let yolcuEkleCokluObject = {"uetdsSeferReferansNo": "21032260832100","yolcuListesi": [{"uetdsSeferReferansNo": "21032260832100","uyrukUlke": "TR","tcKimlikPasaportNo": "11111111111","cinsiyet": "E","adi": "hasan","soyadi": "türk","koltukNo": "","telefonNo": "","grupId": "118621","hesKodu": ""},{"uetdsSeferReferansNo": "21032260832100","uyrukUlke": "TR","tcKimlikPasaportNo": "22222222222","cinsiyet": "E","adi": "recep","soyadi": "balsız","koltukNo": "","telefonNo": "","grupId": "118621","hesKodu": ""}]}
 * * @return {Object} 
 */
const yolcuEkleCoklu = async (yolcuEkleCokluObject) => {
    if (typeof yolcuEkleCokluObject == "object") {
        let uetdsSeferReferansNo=yolcuEkleCokluObject.uetdsSeferReferansNo
        let yolcuArray=yolcuEkleCokluObject.yolcuListesi
        let yolcuBilgileri = "";
        yolcuArray.forEach((element) => {
            yolcuBilgileri += `<yolcuBilgileri>
            <uyrukUlke>`+ element.uyrukUlke + `</uyrukUlke>
            <tcKimlikPasaportNo>`+ element.tcKimlikPasaportNo + `</tcKimlikPasaportNo>
            <!--Optional:-->
            <cinsiyet>`+ element.cinsiyet + `</cinsiyet>
            <adi>`+ element.adi + `</adi>
            <soyadi>`+ element.soyadi + `</soyadi>
            <koltukNo>`+ element.koltukNo + `</koltukNo>
            <!--Optional:-->
            <telefonNo>`+ element.telefonNo + `</telefonNo>
            <grupId>`+ element.grupId + `</grupId>
            <!--Optional:-->
            <hesKodu>`+ element.hesKodu + `</hesKodu>
         </yolcuBilgileri>`
        })

        let xml =
            `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:yolcuEkleCoklu>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <uetdsSeferReferansNo>`+ uetdsSeferReferansNo + `</uetdsSeferReferansNo>
              <!--Optional:-->
              `+ yolcuBilgileri + ` 
           </uet:yolcuEkleCoklu>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yolcuEkleCokluResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} yolcuBildirimSorgula [uetdsSeferReferansNo*,seferYolcuRefNo*]
 * let yolcuBildirimSorgulaObject = {uetdsSeferReferansNo: "21011460312742",seferYolcuRefNo: "108810"}
 * @return {Object} 
 */
const yolcuBildirimSorgula = async (yolcuBildirimSorgulaObject) => {
    if (typeof yolcuBildirimSorgulaObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:yolcuBildirimSorgula>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <uetdsSeferReferansNo>`+ yolcuBildirimSorgulaObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
              <!--Optional:-->
              <seferYolcuRefNo>`+ yolcuBildirimSorgulaObject.seferYolcuRefNo + `</seferYolcuRefNo>
           </uet:yolcuBildirimSorgula>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yolcuBildirimSorgulaResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferGrupEkle [uetdsSeferReferansNo*,grupAciklama*,baslangicUlke*,baslangicIl*,baslangicIlce*,baslangicYer,bitisUlke*,bitisIl*,bitisIlce*,bitisYer,grupAdi*,grupUcret*]
 * let seferGrupEkleObject = {uetdsSeferReferansNo: "21011460312742",grupAciklama: "108810",baslangicUlke: "TR",baslangicIl: "48",baslangicIlce: "2089",baslangicYer: "",bitisUlke: "TR",bitisIl: "48",bitisIlce:"2089",bitisYer: "",grupAdi: "Deneme Grup",grupUcret: "250"}
 * @return {Object} 
 */
const seferGrupEkle = async (seferGrupEkleObject) => {
    if (typeof seferGrupEkleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferGrupEkle>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <uetdsSeferReferansNo>`+ seferGrupEkleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
              <!--Optional:-->
              <seferGrupBilgileriInput>
                <grupAciklama>`+ seferGrupEkleObject.grupAciklama + `</grupAciklama>
                <baslangicUlke>`+ seferGrupEkleObject.baslangicUlke + `</baslangicUlke>
                <baslangicIl>`+ seferGrupEkleObject.baslangicIl + `</baslangicIl>
                <baslangicIlce>`+ seferGrupEkleObject.baslangicIlce + `</baslangicIlce>
                <!--Optional:-->
                <baslangicYer>`+ seferGrupEkleObject.baslangicYer + `</baslangicYer>
                <bitisUlke>`+ seferGrupEkleObject.bitisUlke + `</bitisUlke>
                <bitisIl>`+ seferGrupEkleObject.bitisIl + `</bitisIl>
                <bitisIlce>`+ seferGrupEkleObject.bitisIlce + `</bitisIlce>
                <bitisYer>`+ seferGrupEkleObject.bitisYer + `</bitisYer>
                <grupAdi>`+ seferGrupEkleObject.grupAdi + `</grupAdi>
                <!--Optional:-->
                <grupUcret>`+ seferGrupEkleObject.grupUcret + `</grupUcret>
            </seferGrupBilgileriInput>
            </uet:seferGrupEkle>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferGrupEkleResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferGrupGuncelle [uetdsSeferReferansNo*,grupId*,grupAciklama*,baslangicUlke*,baslangicIl*,baslangicIlce*,baslangicYer,bitisUlke*,bitisIl*,bitisIlce*,bitisYer,grupAdi*,grupUcret*]
 * let seferGrupGuncelleObject = {uetdsSeferReferansNo: "21011460312742",grupId:"113903",grupAciklama: "108810",baslangicUlke: "TR",baslangicIl: "48",baslangicIlce: "2089",baslangicYer: "",bitisUlke: "TR",bitisIl: "48",bitisIlce:"2089",bitisYer: "",grupAdi: "Deneme Grup",grupUcret: "250"}
 * @return {Object} 
 */
const seferGrupGuncelle = async (seferGrupGuncelleObject) => {
    if (typeof seferGrupGuncelleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferGrupGuncelle>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferGrupGuncelleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <grupId>`+ seferGrupGuncelleObject.grupId + `</grupId>
                <!--Optional:-->
              <seferGrupBilgileriInput>
                <grupAciklama>`+ seferGrupGuncelleObject.grupAciklama + `</grupAciklama>
                <baslangicUlke>`+ seferGrupGuncelleObject.baslangicUlke + `</baslangicUlke>
                <baslangicIl>`+ seferGrupGuncelleObject.baslangicIl + `</baslangicIl>
                <baslangicIlce>`+ seferGrupGuncelleObject.baslangicIlce + `</baslangicIlce>
                <!--Optional:-->
                <baslangicYer>`+ seferGrupGuncelleObject.baslangicYer + `</baslangicYer>
                <bitisUlke>`+ seferGrupGuncelleObject.bitisUlke + `</bitisUlke>
                <bitisIl>`+ seferGrupGuncelleObject.bitisIl + `</bitisIl>
                <bitisIlce>`+ seferGrupGuncelleObject.bitisIlce + `</bitisIlce>
                <bitisYer>`+ seferGrupGuncelleObject.bitisYer + `</bitisYer>
                <grupAdi>`+ seferGrupGuncelleObject.grupAdi + `</grupAdi>
                <!--Optional:-->
                <grupUcret>`+ seferGrupGuncelleObject.grupUcret + `</grupUcret>
            </seferGrupBilgileriInput>
            </uet:seferGrupGuncelle>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferGrupGuncelleResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferGrupIptal [uetdsSeferReferansNo*,grupId*,iptalAciklama]
 * let seferGrupIptalObject = {uetdsSeferReferansNo: "21011460312742",grupId:"113903",iptalAciklama: ""}
 * @return {Object} 
 */
const seferGrupIptal = async (seferGrupIptalObject) => {
    if (typeof seferGrupIptalObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferGrupIptal>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferGrupIptalObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <grupId>`+ seferGrupIptalObject.grupId + `</grupId>
                <!--Optional:-->
                <iptalAciklama>`+ seferGrupIptalObject.iptalAciklama + `</iptalAciklama>
            </uet:seferGrupIptal>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferGrupIptalResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferGrupListeleIptal [uetdsSeferReferansNo*]
 * let seferGrupListeleObject = {uetdsSeferReferansNo: "21011460312742"}
 * @return {Object} 
 */
const seferGrupListele = async (seferGrupListeleObject) => {
    if (typeof seferGrupListeleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferGrupListesi>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferGrupListeleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
            </uet:seferGrupListesi>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferGrupListesiResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} yolcuIptal [uetdsSeferReferansNo*,koltukNo*,yolcuTCKimlikPasaportNo*,iptalAciklama]
 * let yolcuIptalObject = {uetdsSeferReferansNo: "21011460312742",koltukNo:"222",yolcuTCKimlikPasaportNo:"11111111111",iptalAciklama:""}
 * @return {Object} 
 */
const yolcuIptal = async (yolcuIptalObject) => {
    if (typeof yolcuIptalObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:yolcuIptal>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ yolcuIptalObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <iptalYolcu>
                    <koltukNo>`+ yolcuIptalObject.koltukNo + `</koltukNo>
                    <yolcuTCKimlikPasaportNo>`+ yolcuIptalObject.yolcuTCKimlikPasaportNo + `</yolcuTCKimlikPasaportNo>
                    <!--Optional:-->
                    <iptalAciklama>`+ yolcuIptalObject.iptalAciklama + `</iptalAciklama>
                </iptalYolcu>
            </uet:yolcuIptal>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yolcuIptalResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} yolcuIptalUetdsYolcuRefNoIle [uetdsSeferReferansNo*,uetdsYolcuReferansNo*,iptalAciklama]
 * let yolcuIptalUetdsYolcuRefNoIleObject = {uetdsSeferReferansNo: "21011460312742",uetdsYolcuReferansNo:"222"}
 * @return {Object} 
 */
const yolcuIptalUetdsYolcuRefNoIle = async (yolcuIptalUetdsYolcuRefNoIleObject) => {
    if (typeof yolcuIptalUetdsYolcuRefNoIleObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:yolcuIptalUetdsYolcuRefNoIle>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ yolcuIptalUetdsYolcuRefNoIleObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
                <uetdsYolcuReferansNo>`+ yolcuIptalUetdsYolcuRefNoIleObject.uetdsYolcuReferansNo + `</uetdsYolcuReferansNo>
                <!--Optional:-->
                <iptalAciklama>`+ yolcuIptalUetdsYolcuRefNoIleObject.iptalAciklama + `</iptalAciklama>
            </uet:yolcuIptalUetdsYolcuRefNoIle>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yolcuIptalUetdsYolcuRefNoIleResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} seferDetayCiktisiAl [uetdsSeferReferansNo*]
 * let seferDetayCiktisiAlObject = {uetdsSeferReferansNo: "21011460312742"}
 * @return {Object} 
 */
const seferDetayCiktisiAl = async (seferDetayCiktisiAlObject) => {
    if (typeof seferDetayCiktisiAlObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:seferDetayCiktisiAl>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ seferDetayCiktisiAlObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
            </uet:seferDetayCiktisiAl>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:seferDetayCiktisiAlResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} bildirimOzeti [uetdsSeferReferansNo*]
 * let bildirimOzetiObject = {uetdsSeferReferansNo: "21011460312742"}
 * @return {Object} 
 */
const bildirimOzeti = async (bildirimOzetiObject) => {
    if (typeof bildirimOzetiObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:bildirimOzeti>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <uetdsSeferReferansNo>`+ bildirimOzetiObject.uetdsSeferReferansNo + `</uetdsSeferReferansNo>
                <!--Optional:-->
            </uet:bildirimOzeti>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:bildirimOzetiResponse']['return'];
        return data;
    }
}


/***
 * @param {} kullaniciKontrol []
 * @return {Object} 
 */
const kullaniciKontrol = async () => {

    let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
            <soapenv:Body>
                <uet:kullaniciKontrol>
                <!--Optional:-->
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <!--Optional:-->
                <sifre>`+ password + `</sifre>
                </uet:kullaniciKontrol>
            </soapenv:Body>
        </soapenv:Envelope>`;

    const res = await soapServer.post(url, xml);

    const jsonObj = parser.parse(res.data);
    const data = jsonObj['S:Envelope']['S:Body']['ns2:kullaniciKontrolResponse']['return'];

    return data;
}


/***
 * @param {Object} yetkiBelgesiKontrol [plaka*]
 * let yetkiBelgesiKontrolObject = {plaka: "48E4848"}
 * @return {Object} 
 */
const yetkiBelgesiKontrol = async (yetkiBelgesiKontrolObject) => {
    if (typeof yetkiBelgesiKontrolObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:yetkiBelgesiKontrol>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <plaka>`+ yetkiBelgesiKontrolObject.plaka + `</plaka>
                <!--Optional:-->
            </uet:yetkiBelgesiKontrol>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:yetkiBelgesiKontrolResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} meslekiYeterlilikSorgula [kimlikNo*]
 * let meslekiYeterlilikSorgulaObject = {kimlikNo: "11111111111"}
 * @return {Object} 
 */
const meslekiYeterlilikSorgula = async (meslekiYeterlilikSorgulaObject) => {
    if (typeof meslekiYeterlilikSorgulaObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
            <uet:meslekiYeterlilikSorgula>
              <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <!--Optional:-->
                <kimlikNo>`+ meslekiYeterlilikSorgulaObject.kimlikNo + `</kimlikNo>
                <!--Optional:-->
            </uet:meslekiYeterlilikSorgula>
            </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:meslekiYeterlilikSorgulaResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} aracMuayeneSorgula [plaka*]
 * let aracMuayeneSorgulaObject = {plaka: "48E4848"}
 * @return {Object} 
 */
const aracMuayeneSorgula = async (aracMuayeneSorgulaObject) => {
    if (typeof aracMuayeneSorgulaObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:aracMuayeneSorgula>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <plaka>`+ aracMuayeneSorgulaObject.plaka + `</plaka>
           </uet:aracMuayeneSorgula>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:aracMuayeneSorgulaResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} kimlikDogrulama [kimlikNo*,adi*,soyadi*]
 * let kimlikDogrulamaObject = {kimlikNo: "11111111111",adi:"",soyadi:""}
 * @return {Object} 
 * isUygun:false -> TCKN doğru ad soyad eşleşmedi
 * isUygun:true -> TCKN doğru ad soyad eşleşti
 */
const kimlikDogrulama = async (kimlikDogrulamaObject) => {
    if (typeof kimlikDogrulamaObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:kimlikDogrulama>
              <!--Optional:-->
              <wsuser>
                <kullaniciAdi>`+ username + `</kullaniciAdi>
                <sifre>`+ password + `</sifre>
              </wsuser>
              <!--Optional:-->
              <kimlikBilgileriInput>
                <kimlikNo>`+ kimlikDogrulamaObject.kimlikNo + `</kimlikNo>
                <adi>`+ kimlikDogrulamaObject.adi + `</adi>
                <soyadi>`+ kimlikDogrulamaObject.soyadi + `</soyadi>
              </kimlikBilgileriInput>
           </uet:kimlikDogrulama>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:kimlikDogrulamaResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} kimlikDogrulama [ipBaslangic*,ipBitis*]
 * let kimlikDogrulamaObject = {ipBaslangic: "212.175.113.161",ipBitis:"212.175.113.161"}
 * @return {Object} 
 */
const ipTanimla = async (kimlikDogrulamaObject) => {
    if (typeof kimlikDogrulamaObject == "object") {

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:ipTanimla>
                <!--Optional:-->
                <wsuser>
                    <kullaniciAdi>`+ username + `</kullaniciAdi>
                    <sifre>`+ password + `</sifre>
                </wsuser>
                <ipBaslangic>`+ kimlikDogrulamaObject.ipBaslangic + `</ipBaslangic>
                <!--Optional:-->
                <ipBitis>`+ kimlikDogrulamaObject.ipBitis + `</ipBitis>
           </uet:ipTanimla>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:ipTanimlaResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} ipListele []
 * @return {Object} 
 */
const ipListele = async () => {
    let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
           <uet:ipListele>
              <wsuser>
              <kullaniciAdi>`+ username + `</kullaniciAdi>
              <sifre>`+ password + `</sifre>
              </wsuser>
           </uet:ipListele>
        </soapenv:Body>
        </soapenv:Envelope>`;

    const res = await soapServer.post(url, xml);

    const jsonObj = parser.parse(res.data);
    const data = jsonObj['S:Envelope']['S:Body']['ns2:ipListeleResponse']['return'];

    return data;
}


/***
 * @param {Object} ipSil [ipId*]
 * let ipSilObject = {ipId: "1881"}
 * @return {Object} 
 */
const ipSil = async (ipSilObject) => {
    if (typeof ipSilObject == "object") {
        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
        <uet:ipSil>
            <wsuser>
            <kullaniciAdi>`+ username + `</kullaniciAdi>
            <sifre>`+ password + `</sifre>
            </wsuser>
            <ipId>`+ ipSilObject.ipId + `</ipId>
        </uet:ipSil>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:ipSilResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} hesKoduKontrolEt [hesKodu*]
 * let hesKoduKontrolEtObject = {hesKodu: "G4G81375S3"}
 * @return {Object} 
 */
const hesKoduKontrolEt = async (hesKoduKontrolEtObject) => {

    if (typeof hesKoduKontrolEtObject == "object") {
        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
        <uet:hesKoduKontrolEt>
            <wsuser>
            <kullaniciAdi>`+ username + `</kullaniciAdi>
            <sifre>`+ password + `</sifre>
            </wsuser>
            <hesKodu>`+ hesKoduKontrolEtObject.hesKodu + `</hesKodu>
        </uet:hesKoduKontrolEt>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:hesKoduKontrolEtResponse']['return'];

        return data;
    }
}


/***
 * @param {Array} cokluHesKoduKontrolEt [hesKoduListesi*]
 * let cokluHesKoduKontrolEtArray =[{hesKoduListesi: "G4G81375S3"}]
 * @return {Object} 
 */
const cokluHesKoduKontrolEt = async (cokluHesKoduKontrolEtArray) => {

    if (Array.isArray(cokluHesKoduKontrolEtArray)) {
        let hesKoduListesi = "";

        cokluHesKoduKontrolEtArray.forEach((element) => {
            hesKoduListesi += ` <hesKoduListesi>` + element.hesKodu + `</hesKoduListesi>`
        })

        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
        <uet:cokluHesKoduKontrolEt>
            <wsuser>
            <kullaniciAdi>`+ username + `</kullaniciAdi>
            <sifre>`+ password + `</sifre>
            </wsuser>
            `+ hesKoduListesi + `
        </uet:cokluHesKoduKontrolEt>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:cokluHesKoduKontrolEtResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} hesKoduBlokeEt [hesKodu*,gecerlilikTarihi*,aciklama,firmaReferansNo*]
 * let hesKoduKontrolEtObject = {hesKodu: "F9D91132S8",gecerlilikTarihi:"2021-05-30T09:00:00",aciklama:"22",firmaReferansNo:"111"}
 * @return {Object} 
 */
const hesKoduBlokeEt = async (hesKoduBlokeEtObject) => {

    if (typeof hesKoduBlokeEtObject == "object") {
        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
        <uet:hesKoduBlokeEt>
            <wsuser>
            <kullaniciAdi>`+ username + `</kullaniciAdi>
            <sifre>`+ password + `</sifre>
            </wsuser>
            <hesKodu>`+ hesKoduBlokeEtObject.hesKodu + `</hesKodu>
            <gecerlilikTarihi>`+ hesKoduBlokeEtObject.gecerlilikTarihi + `</gecerlilikTarihi>
            <aciklama>`+ hesKoduBlokeEtObject.aciklama + `</aciklama>
            <firmaReferansNo>`+ hesKoduBlokeEtObject.firmaReferansNo + `</firmaReferansNo>
        </uet:hesKoduBlokeEt>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:hesKoduBlokeEtResponse']['return'];

        return data;
    }
}


/***
 * @param {Object} hesKoduBlokeKaldir [hesKodu*,blokeId*,gecerlilikTarihi*,firmaReferansNo*]
 * let hesKoduBlokeKaldirObject = {hesKodu: "F9D91132S8",gecerlilikTarihi:"2021-05-30T09:00:00",blokeId:"22",firmaReferansNo:"111"}
 * @return {Object} 
 */
const hesKoduBlokeKaldir = async (hesKoduBlokeKaldirObject) => {

    if (typeof hesKoduBlokeKaldirObject == "object") {
        let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:uet="http://uetds.unetws.udhb.gov.tr/">
        <soapenv:Header/>
        <soapenv:Body>
        <uet:hesKoduBlokeKaldir>
            <wsuser>
            <kullaniciAdi>`+ username + `</kullaniciAdi>
            <sifre>`+ password + `</sifre>
            </wsuser>
            <hesKodu>`+ hesKoduBlokeKaldirObject.hesKodu + `</hesKodu>
            <blokeId>`+ hesKoduBlokeKaldirObject.blokeId + `</blokeId>
            <firmaReferansNo>`+ hesKoduBlokeKaldirObject.firmaReferansNo + `</firmaReferansNo>   
        </uet:hesKoduBlokeKaldir>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const res = await soapServer.post(url, xml);

        const jsonObj = parser.parse(res.data);
        const data = jsonObj['S:Envelope']['S:Body']['ns2:hesKoduBlokeKaldirResponse']['return'];

        return data;
    }
}


module.exports = {
    seferEkle,
    seferGuncelle,
    seferIptal,
    seferPlakaDegistir,
    seferAktif,
    personelEkle,
    personelIptal,
    yolcuEkle,
    yolcuEkleCoklu,
    yolcuBildirimSorgula,
    seferGrupEkle,
    seferGrupGuncelle,
    seferGrupIptal,
    seferGrupListele,
    yolcuIptal,
    yolcuIptalUetdsYolcuRefNoIle,
    seferDetayCiktisiAl,
    bildirimOzeti,
    kullaniciKontrol,
    yetkiBelgesiKontrol,
    meslekiYeterlilikSorgula,
    aracMuayeneSorgula,
    kimlikDogrulama,
    ipTanimla,
    ipListele,
    ipSil,
    hesKoduKontrolEt,
    cokluHesKoduKontrolEt,
    hesKoduBlokeEt,
    hesKoduBlokeKaldir
}