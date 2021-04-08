const express = require('express');
const router = express.Router({ mergeParams: true });

const { seferEkle, seferGuncelle, seferIptal, seferPlakaDegistir, seferAktif, personelEkle, personelIptal, yolcuEkle, yolcuEkleCoklu,
    yolcuBildirimSorgula, seferGrupEkle, seferGrupGuncelle, seferGrupIptal, seferGrupListele, yolcuIptal, 
    yolcuIptalUetdsYolcuRefNoIle,seferDetayCiktisiAl,bildirimOzeti,kullaniciKontrol,
    yetkiBelgesiKontrol,meslekiYeterlilikSorgula,aracMuayeneSorgula,kimlikDogrulama,ipTanimla,ipListele,ipSil,
    hesKoduKontrolEt,cokluHesKoduKontrolEt,hesKoduBlokeEt,hesKoduBlokeKaldir } = require('../controllers/uetdsSoapServiceTestURL');
const { protect } = require('../middleware/auth')

router.route('/seferEkle').post(protect, seferEkle);
router.route('/seferGuncelle').post(protect, seferGuncelle);
router.route('/seferIptal').post(protect, seferIptal);
router.route('/seferPlakaDegistir').post(protect, seferPlakaDegistir);
router.route('/seferAktif').post(protect, seferAktif);
router.route('/personelEkle').post(protect, personelEkle);
router.route('/personelIptal').post(protect, personelIptal);
router.route('/yolcuEkle').post(protect, yolcuEkle);
router.route('/yolcuEkleCoklu').post(protect, yolcuEkleCoklu);
router.route('/yolcuIptal').post(protect, yolcuIptal);
router.route('/yolcuIptalUetdsYolcuRefNoIle').post(protect, yolcuIptalUetdsYolcuRefNoIle);
router.route('/yolcuBildirimSorgula').post(protect, yolcuBildirimSorgula);
router.route('/seferGrupEkle').post(protect, seferGrupEkle);
router.route('/seferGrupGuncelle').post(protect, seferGrupGuncelle);
router.route('/seferGrupIptal').post(protect, seferGrupIptal);
router.route('/seferGrupListele').post(protect, seferGrupListele);
router.route('/seferDetayCiktisiAl').post(protect, seferDetayCiktisiAl);
router.route('/bildirimOzeti').post(protect, bildirimOzeti);
router.route('/kullaniciKontrol').post(protect, kullaniciKontrol);
router.route('/yetkiBelgesiKontrol').post(protect, yetkiBelgesiKontrol);
router.route('/meslekiYeterlilikSorgula').post(protect, meslekiYeterlilikSorgula);
router.route('/aracMuayeneSorgula').post(protect, aracMuayeneSorgula);
router.route('/kimlikDogrulama').post(protect, kimlikDogrulama);
router.route('/ipTanimla').post(protect, ipTanimla);
router.route('/ipListele').post(protect, ipListele);
router.route('/ipSil').post(protect, ipSil);
router.route('/hesKoduKontrolEt').post(protect, hesKoduKontrolEt);
router.route('/cokluHesKoduKontrolEt').post(protect, cokluHesKoduKontrolEt);
router.route('/hesKoduBlokeEt').post(protect, hesKoduBlokeEt);
router.route('/hesKoduBlokeKaldir').post(protect, hesKoduBlokeKaldir);

module.exports = router;