import React, { useState, useEffect } from 'react';

// --- BAZA DANYCH PRODUKTÓW (Rozszerzona o opisy z podstron) ---
const kawy = [
  {
    id: 1, kategoria: 'kawa', kraj: "Kenia", region: "Nyeri / Kieni", obrobka: "Myta (Washed)",
    nuty: "Czerwona porzeczka, rabarbar, hibiskus", przeznaczenie: "Filtr", cena: 69.00, waga: "250g",
    obrazek: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
    farma: "Kieni Wet Mill, 1800 m n.p.m.", stopienPalenia: "Jasny (Specialty)",
    ikonaGłówna: "ph-sparkle",
    opis1: "Kieni to spółdzielnia zlokalizowana w sercu regionu Nyeri, słynącego z najlepszych kaw w Kenii. Czerwona, wulkaniczna gleba i idealne wysokości sprawiają, że ziarna stąd charakteryzują się niezwykle intensywną, owocową kwasowością i czystością smaku.",
    opis2: "Ta partia przeszła klasyczną, kenijską podwójną fermentację (mycie), co nadaje naparowi profil przypominający rześki sok z czerwonej porzeczki zbalansowany słodyczą dojrzałego rabarbaru. To kawa, która na długo zostaje w pamięci."
  },
  {
    id: 2, kategoria: 'kawa', kraj: "Etiopia", region: "Guji / Hambela", obrobka: "Naturalna (Natural)",
    nuty: "Truskawka, mleczna czekolada", przeznaczenie: "Filtr", cena: 72.00, waga: "250g",
    obrazek: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    farma: "Hambela Wamena, 2000 m n.p.m.", stopienPalenia: "Jasny (Specialty)",
    ikonaGłówna: "ph-sparkle",
    opis1: "Hambela to legendarna stacja myjąca w regionie Guji, skąd pochodzą jedne z najbardziej pożądanych kaw na świecie. Ziarna z tej partii były suszone na afrykańskich łóżkach przez 21 dni w pełnym słońcu. Obróbka naturalna pozwoliła zamknąć w ziarnie mnóstwo słodyczy i niesamowitych, owocowych estrów.",
    opis2: "W filiżance dominuje uderzająca słodycz dojrzałych truskawek, która po ostygnięciu przechodzi w gładki finisz przypominający mleczną czekoladę. To idealna propozycja dla fanów kaw soczystych, słodkich i z owocowym 'kompotem' w przelewie."
  },
  {
    id: 3, kategoria: 'kawa', kraj: "Kolumbia", region: "Huila / El Bombo", obrobka: "Myta (Washed)",
    nuty: "Czerwone jabłko, karmel, migdały", przeznaczenie: "Espresso", cena: 58.00, waga: "250g",
    obrazek: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop",
    farma: "Finca El Bombo, 1750 m n.p.m.", stopienPalenia: "Średni (Espresso)",
    ikonaGłówna: "ph-sparkle",
    opis1: "Region Huila w południowej Kolumbii jest znany z produkcji jednych z najbardziej złożonych i słodkich kaw na świecie. Cechuje go specyficzny mikroklimat sprzyjający powolnemu dojrzewaniu owoców kawowca. Partia z Finca El Bombo to esencja tego, co najlepsze w kolumbijskiej obróbce mytej – czystość, jedwabiste body i świetny balans.",
    opis2: "To nasza rekomendacja do ekspresów ciśnieniowych i kawiarek. Słodycz przypominająca gęsty karmel doskonale łączy się z rześką kwasowością czerwonego jabłka, tworząc napar, który wybitnie pije się jako klasyczne espresso. Kawa ta genialnie przebija się również w połączeniu ze spienionym mlekiem."
  },
  {
    id: 4, kategoria: 'kawa', kraj: "Brazylia", region: "Cerrado Mineiro", obrobka: "Naturalna (Natural)",
    nuty: "Czekolada deserowa, orzech laskowy", przeznaczenie: "Espresso", cena: 45.00, waga: "250g",
    obrazek: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop",
    farma: "Różne farmy regionu, 1100 m n.p.m.", stopienPalenia: "Średni (Espresso)",
    ikonaGłówna: "ph-sparkle",
    opis1: "Cerrado Mineiro to pierwszy region w Brazylii chroniony oznaczeniem geograficznym (Denominação de Origem). Kawa z tego obszaru to absolutny klasyk i gwarancja najwyższej jakości ziaren segmentu specialty. Zbiory przebiegają na równinnych płaskowyżach, gdzie wyraźne pory roku pozwalają na doskonałe suszenie ziaren na słońcu.",
    opis2: "W filiżance odnajdziesz potężne, kremowe body, niezwykle niską kwasowość i gęstą cremę. Profil zdominowany jest przez słodkie nuty deserowej czekolady, nugatu i prażonych orzechów laskowych. To idealna propozycja jako codzienne, 'czekoladowe' espresso oraz fenomenalna baza pod gładkie kawy mleczne, takie jak flat white czy cappuccino."
  }
];

const akcesoria = [
  {
    id: 101, kategoria: 'akcesorium', nazwa: "Dripper V60", podkategoria: "Zaparzacz", opisKrotki: "Ceramiczny klasyk Hario.",
    cena: 95.00, obrazek: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?q=80&w=800&auto=format&fit=crop",
    cecha1: "Ceramika", cecha2: "Metody alternatywne", cecha3: "Japonia", ikonaGłówna: "ph-coffee",
    opis1: "Klasyczny zaparzacz...", opis2: "Idealny na start."
  },
  {
    id: 102, kategoria: 'akcesorium', nazwa: "Comandante C40", podkategoria: "Młynek ręczny", opisKrotki: "Niemiecka precyzja mielenia.",
    cena: 1199.00, obrazek: "https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?q=80&w=800&auto=format&fit=crop",
    cecha1: "Stal wzmacniana azotem, naturalne drewno", cecha2: "Od espresso po dripa i French Press", cecha3: "Niemcy (Produkcja ręczna)", ikonaGłówna: "ph-gear",
    opis1: "Comandante C40 to złoty standard wśród ręcznych młynków do kawy. Projektowany i rzemieślniczo produkowany w Niemczech z wykorzystaniem najwyższej jakości materiałów, oferuje precyzję mielenia porównywalną z najlepszymi i najdroższymi młynkami elektrycznymi na rynku.",
    opis2: "Serce młynka – żarna Nitro Blade – wykonane są ze specjalnej, wzmacnianej azotem stali nierdzewnej. Gwarantują niezwykle równy przemiał z minimalną ilością pyłu oraz imponującą żywotność."
  },
  {
    id: 103, kategoria: 'akcesorium', nazwa: "Filtry papierowe", podkategoria: "Materiały", opisKrotki: "Bielone, 100 sztuk.",
    cena: 25.00, obrazek: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=800&auto=format&fit=crop",
    cecha1: "Bielony papier (bez posmaku)", cecha2: "Drippery Hario V60 (rozmiar 02)", cecha3: "100 sztuk", ikonaGłówna: "ph-drop",
    opis1: "Oryginalne filtry papierowe Hario przeznaczone do dripperów w rozmiarze 02 (pozwalających na zaparzenie od 1 do 4 filiżanek kawy). Stanowią nieodłączny element metody przelewowej, gwarantując idealnie czysty i przejrzysty napar, pozbawiony drobin ziaren.",
    opis2: "Wersja bielona jest szczególnie polecana przez baristów, ponieważ po krótkim przelaniu wrzątkiem nie pozostawia w kawie żadnego niepożądanego smaku czy zapachu papieru (często wyczuwalnego w tanich filtrach szarych)."
  },
  {
    id: 104, kategoria: 'akcesorium', nazwa: "Waga cyfrowa", podkategoria: "Precyzja", opisKrotki: "Z timerem i stoperem.",
    cena: 149.00, obrazek: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop",
    cecha1: "0.1g (od 0.5g do 2000g)", cecha2: "Wbudowany stoper, tarowanie", cecha3: "Wbudowany akumulator (USB-C)", ikonaGłówna: "ph-scales",
    opis1: "Precyzja to klucz do powtarzalnego i idealnego naparu. Nasza waga cyfrowa pozwala na odmierzenie ziaren oraz wody z dokładnością do 0.1 grama. Zintegrowany, łatwo dostępny stoper ułatwia kontrolę czasu ekstrakcji podczas parzenia metodami przelewowymi.",
    opis2: "Kompaktowy, minimalistyczny design, odporność na zachlapania (dzięki silikonowej podkładce izolującej) oraz wygodne ładowanie przez uniwersalny port USB-C sprawiają, że to niezastąpione narzędzie w arsenale każdego domowego baristy."
  }
];

export default function App() {
  // --- STANY APLIKACJI ---
  const [koszyk, setKoszyk] = useState(() => JSON.parse(localStorage.getItem('aroma_koszyk')) || []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // System routingu: view może być 'home', 'kasa', 'polityka', 'product'
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- EFEKTY ---
  useEffect(() => {
    localStorage.setItem('aroma_koszyk', JSON.stringify(koszyk));
  }, [koszyk]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolluj do góry przy zmianie widoku
  }, [currentView, selectedProduct]);

  // TUTAJ WKLEJASZ NOWY KOD:
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentView(event.state.view);
        setSelectedProduct(event.state.product);
      } else {
        setCurrentView('home');
        setSelectedProduct(null);
      }
      setIsCartOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  // KONIEC NOWEGO KODU

  // --- LOGIKA KOSZYKA ---
  const dodajDoKoszyka = (produkt, kategoria) => {
    setKoszyk(prev => {
      const index = prev.findIndex(item => item.id === produkt.id && item.kategoria === kategoria);
      if (index !== -1) {
        const nowyKoszyk = [...prev];
        // Poprawka: tworzymy nowy obiekt przedmiotu zamiast modyfikować stary
        nowyKoszyk[index] = { ...nowyKoszyk[index], ilosc: nowyKoszyk[index].ilosc + 1 };
        return nowyKoszyk;
      }
      return [...prev, {
        id: produkt.id,
        kategoria: kategoria,
        nazwa: kategoria === 'kawa' ? produkt.kraj : produkt.nazwa,
        wariant: kategoria === 'kawa' ? produkt.przeznaczenie : produkt.podkategoria,
        cena: produkt.cena,
        obrazek: produkt.obrazek,
        ilosc: 1
      }];
    });
    setIsCartOpen(true);
  };

  const zmienIlosc = (index, zmiana) => {
    setKoszyk(prev => {
      const nowyKoszyk = [...prev];
      // Poprawka: bezpieczna zmiana ilości
      nowyKoszyk[index] = { ...nowyKoszyk[index], ilosc: nowyKoszyk[index].ilosc + zmiana };
      if (nowyKoszyk[index].ilosc <= 0) nowyKoszyk.splice(index, 1);
      return nowyKoszyk;
    });
  };

  const wyczyscKoszyk = () => setKoszyk([]);

  const sumaKoszyka = koszyk.reduce((suma, item) => suma + item.cena * item.ilosc, 0);
  const iloscWKoszyku = koszyk.reduce((suma, item) => suma + item.ilosc, 0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- NAWIGACJA ---
    const navigate = (view, product = null) => {
      window.history.pushState({ view, product }, '');
      setCurrentView(view);
      setSelectedProduct(product);
      setIsCartOpen(false);
    };

  // --- KOMPONENTY WSPÓŁDZIELONE ---
  const Navbar = () => (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => navigate('home')}>
            <span className="font-['Montserrat'] font-black text-2xl tracking-tighter uppercase hover:opacity-60 transition-opacity">AROMA.</span>
          </div>
          {currentView === 'home' && (
            <div className="flex flex-1 justify-end pr-6 overflow-x-auto no-scrollbar space-x-6 md:space-x-8 md:pr-10">
              <button onClick={() => scrollToSection('kawa')} className="font-['Montserrat'] font-bold text-xs sm:text-sm uppercase tracking-wide hover:opacity-60 transition-opacity whitespace-nowrap">Sklep</button>
              <button onClick={() => scrollToSection('o-nas')} className="font-['Montserrat'] font-bold text-xs sm:text-sm uppercase tracking-wide hover:opacity-60 transition-opacity whitespace-nowrap">O nas</button>
            </div>
          )}
          <div className="flex items-center flex-shrink-0">
            <button onClick={() => setIsCartOpen(true)} className="relative flex items-center gap-2 hover:opacity-60 transition-opacity group">
              <i className="ph ph-shopping-bag text-2xl"></i>
              <span className="font-['Montserrat'] font-bold text-sm uppercase hidden sm:block">Koszyk</span>
              <span className="absolute -top-1 -right-2 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-[#111111] rounded-full">{iloscWKoszyku}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="bg-[#111111] text-white py-16 border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="font-['Montserrat'] font-black text-3xl tracking-tighter uppercase mb-6 block">AROMA.</span>
          <p className="text-gray-400 max-w-sm mb-6">Nie idziemy na skróty. Sprowadzamy najlepsze ziarna, wypalamy je jasno i pijemy z przyjemnością.</p>
        </div>
        <div>
          <h4 className="font-['Montserrat'] font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Sklep</h4>
          <ul className="space-y-4 font-['Montserrat'] font-semibold text-sm uppercase">
            <li><button onClick={() => navigate('home')} className="hover:pl-2 transition-all">Strona Główna</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-['Montserrat'] font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Pomoc</h4>
          <ul className="space-y-4 font-['Montserrat'] font-semibold text-sm uppercase">
            <li><button onClick={() => navigate('polityka')} className="hover:pl-2 transition-all text-white">Polityka prywatności</button></li>
          </ul>
        </div>
      </div>
    </footer>
  );

  const CartDrawer = () => (
    <>
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] transform transition-transform duration-300 flex flex-col shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b border-[#EBEBEB]">
          <h2 className="font-['Montserrat'] font-black text-xl uppercase tracking-tight">Twój Koszyk</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-[#111111] transition-colors"><i className="ph ph-x text-2xl"></i></button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {koszyk.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Twój koszyk jest pusty.</p>
          ) : (
            koszyk.map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <img src={item.obrazek} alt={item.nazwa} className="w-16 h-20 object-cover bg-[#F5F5F5]" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-['Montserrat'] font-bold text-sm uppercase leading-tight pr-4">{item.nazwa}</h4>
                    <button onClick={() => zmienIlosc(index, -item.ilosc)} className="text-gray-400 hover:text-[#E63946] transition-colors"><i className="ph ph-trash text-lg"></i></button>
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-3">{item.wariant}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm whitespace-nowrap">{item.cena.toFixed(2)} zł</span>
                    <div className="flex items-center border border-[#EBEBEB] h-8">
                      <button onClick={() => zmienIlosc(index, -1)} className="w-8 h-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors font-bold text-lg leading-none">-</button>
                      <span className="w-8 text-center text-sm font-bold flex items-center justify-center">{item.ilosc}</span>
                      <button onClick={() => zmienIlosc(index, 1)} className="w-8 h-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors font-bold text-lg leading-none">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-[#EBEBEB] bg-[#F5F5F5]/30">
          <div className="flex justify-between items-center mb-6">
            <span className="font-['Montserrat'] font-bold uppercase text-sm">Suma:</span>
            <span className="font-['Montserrat'] font-black text-xl">{sumaKoszyka.toFixed(2)} zł</span>
          </div>
          <button 
            onClick={() => koszyk.length > 0 && navigate('kasa')}
            className={`w-full text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-4 transition-colors ${koszyk.length > 0 ? 'bg-[#111111] hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Przejdź do kasy
          </button>
        </div>
      </div>
    </>
  );

  // --- WIDOKI (PAGES) ---
  const HomeView = () => (
    <>
      <header className="pt-20">
        <div className="bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center min-h-[70vh]">
            
            {/* Tekst (na mobile na dole, na desktopie po lewej) */}
            <div className="w-full md:w-1/2 px-4 sm:px-6 lg:px-8 py-10 md:py-0 relative z-20 order-2 md:order-1 flex flex-col md:block items-center text-center md:text-left">
              <div className="inline-block bg-[#111111] text-white font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest px-3 py-1 mb-4 md:mb-6">
                Nowe zbiory
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-['Montserrat'] font-black tracking-tighter leading-[1.1] mb-6 uppercase break-words w-full">
                Kawa <br className="hidden md:block"/> bez <br className="hidden md:block"/> kompromisów
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md">
                Jasno palone ziarna segmentu specialty. Świeży profil smakowy, czysta obróbka. Wypalane w Polsce.
              </p>
              <button onClick={() => scrollToSection('kawa')} className="inline-block w-full md:w-auto bg-[#111111] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-4 px-10 hover:bg-gray-800 transition-colors">
                Wybierz Ziarna
              </button>
            </div>

            {/* Zdjęcie (na mobile na górze na pełną szerokość, na desktopie po prawej) */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] relative z-10 order-1 md:order-2 md:p-8 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop" 
                alt="Alternatywne parzenie kawy" 
                className="w-full h-full object-cover md:max-w-md md:shadow-2xl" 
              />
            </div>

          </div>
        </div>
      </header>

      <main id="kawa" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#EBEBEB] pb-4">
            <h2 className="text-3xl font-['Montserrat'] font-black uppercase tracking-tight">Kawy Jednorodne</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {kawy.map(produkt => (
              <div key={produkt.id} className="group cursor-pointer flex flex-col h-full" onClick={() => navigate('product', { ...produkt, type: 'kawa' })}>
                <div className="relative bg-[#F5F5F5] w-full aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center">
                  <div className="absolute top-3 left-3 z-10 bg-white px-2 py-1 font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest border border-[#EBEBEB]">{produkt.przeznaczenie}</div>
                  <img src={produkt.obrazek} alt={produkt.kraj} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button onClick={(e) => { e.stopPropagation(); dodajDoKoszyka(produkt, 'kawa'); }} className="w-full bg-[#111111] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors">Do Koszyka</button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Montserrat'] font-bold text-xl uppercase tracking-tight group-hover:text-[#E63946] transition-colors">{produkt.kraj}</h3>
                    <span className="font-['Montserrat'] font-bold text-lg whitespace-nowrap ml-2">{produkt.cena.toFixed(2)} zł</span>
                  </div>
                  <p className="font-['Montserrat'] font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">{produkt.region}</p>
                  <div className="mt-auto pt-4 space-y-1">
                    <p className="text-xs text-gray-500"><span className="font-semibold text-[#111111]">Obróbka:</span> {produkt.obrobka}</p>
                    <p className="text-xs text-gray-500"><span className="font-semibold text-[#111111]">Profil:</span> {produkt.nuty}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); dodajDoKoszyka(produkt, 'kawa'); }} className="lg:hidden mt-6 w-full border-2 border-[#111111] text-[#111111] font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-3 active:bg-[#111111] active:text-white transition-colors">Do Koszyka</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <section id="akcesoria" className="py-24 bg-[#F5F5F5]/30 border-t border-[#EBEBEB] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#EBEBEB] pb-4">
            <h2 className="text-3xl font-['Montserrat'] font-black uppercase tracking-tight">Sprzęt & Akcesoria</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {akcesoria.map(produkt => (
              <div key={produkt.id} className="group cursor-pointer flex flex-col h-full" onClick={() => navigate('product', { ...produkt, type: 'akcesorium' })}>
                <div className="relative bg-[#F5F5F5] w-full aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute top-3 left-3 z-10 bg-[#111111] text-white px-2 py-1 font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest">{produkt.podkategoria}</div>
                  <img src={produkt.obrazek} alt={produkt.nazwa} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button onClick={(e) => { e.stopPropagation(); dodajDoKoszyka(produkt, 'akcesorium'); }} className="w-full bg-[#111111] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-4 hover:bg-gray-800 transition-colors">Do Koszyka</button>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-['Montserrat'] font-bold text-xl uppercase tracking-tight group-hover:text-[#E63946] transition-colors">{produkt.nazwa}</h3>
                    <span className="font-['Montserrat'] font-bold text-lg whitespace-nowrap ml-2">{produkt.cena.toFixed(2)} zł</span>
                  </div>
                  <p className="font-['Montserrat'] font-medium text-sm text-gray-500 mb-6 flex-grow">{produkt.opisKrotki}</p>
                  <button onClick={(e) => { e.stopPropagation(); dodajDoKoszyka(produkt, 'akcesorium'); }} className="lg:hidden w-full border-2 border-[#111111] text-[#111111] font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-3 active:bg-[#111111] active:text-white transition-colors">Do Koszyka</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="o-nas" className="py-24 bg-white border-t border-[#EBEBEB] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-['Montserrat'] font-black uppercase tracking-tight mb-6">O Palarni</h2>
            <div className="w-12 h-1 bg-[#111111] mb-8"></div>
            <p className="text-gray-600 mb-6 leading-relaxed">Jesteśmy niezależną rzemieślniczą palarnią kawy. Naszym celem jest wydobycie z ziaren tego, co najlepsze, bez dróg na skróty. Starannie selekcjonujemy ziarna segmentu specialty, aby każda filiżanka była wyjątkowym doświadczeniem.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Wypalamy jasno, szanując pracę farmerów i unikalny terroir każdej odmiany. Wierzymy w transparentność, jakość i nieustanną edukację, by dostarczać Ci kawę bez kompromisów.</p>
            <button onClick={() => scrollToSection('kawa')} className="inline-block border-2 border-[#111111] text-[#111111] font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-3 px-8 hover:bg-[#111111] hover:text-white transition-colors">Sprawdź ofertę</button>
          </div>
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" alt="Proces" className="w-full aspect-[4/3] object-cover shadow-xl" />
          </div>
        </div>
      </section>
    </>
  );

  const ProductView = () => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    const isKawa = p.type === 'kawa';

    return (
      <main className="pt-20 min-h-screen flex flex-col animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-[#F5F5F5] flex items-center justify-center p-8 md:p-16 min-h-[50vh] md:min-h-[85vh]">
            <img src={p.obrazek} alt={isKawa ? p.kraj : p.nazwa} className="w-full max-w-md object-cover shadow-2xl" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:px-24 bg-white">
            <div className="mb-4 flex gap-3">
              <span className="inline-block border border-[#111111] px-3 py-1 font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest">{isKawa ? p.przeznaczenie : p.podkategoria}</span>
              <span className="inline-block bg-[#111111] text-white px-3 py-1 font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest">{isKawa ? p.obrobka : (p.kraj || 'Akcesoria')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-['Montserrat'] font-black tracking-tighter uppercase mb-2">{isKawa ? p.kraj : p.nazwa}</h1>
            <h2 className="text-xl md:text-2xl text-gray-500 font-['Montserrat'] font-bold uppercase tracking-widest mb-8">{isKawa ? p.region : p.opisKrotki}</h2>

            <div className="space-y-6 mb-10 border-t border-b border-[#EBEBEB] py-8">
              <div className="flex items-start gap-4">
                <i className={`ph ${p.ikonaGłówna || 'ph-sparkle'} text-2xl text-[#111111] mt-1`}></i>
                <div>
                  <p className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest text-gray-500 mb-1">{isKawa ? "Profil sensoryczny" : "Materiał / Cecha"}</p>
                  <p className="font-medium text-lg">{isKawa ? p.nuty : p.cecha1}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className={`ph ${isKawa ? 'ph-farm' : 'ph-check'} text-2xl text-[#111111] mt-1`}></i>
                <div>
                  <p className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest text-gray-500 mb-1">{isKawa ? "Farma / Stacja" : "Zastosowanie"}</p>
                  <p className="font-medium text-lg">{isKawa ? p.farma : p.cecha2}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className={`ph ${isKawa ? 'ph-fire' : 'ph-info'} text-2xl text-[#111111] mt-1`}></i>
                <div>
                  <p className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest text-gray-500 mb-1">{isKawa ? "Stopień palenia" : "Dodatkowe"}</p>
                  <p className="font-medium text-lg">{isKawa ? p.stopienPalenia : p.cecha3}</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest text-gray-500 mb-1">Cena {isKawa ? 'za 250g' : ''}</p>
                <span className="text-4xl font-['Montserrat'] font-black">{p.cena.toFixed(2)} zł</span>
              </div>
            </div>

            <button onClick={() => dodajDoKoszyka(p, isKawa ? 'kawa' : 'akcesorium')} className="w-full bg-[#111111] text-white font-['Montserrat'] font-bold text-lg uppercase tracking-widest py-5 hover:bg-gray-800 transition-colors shadow-xl active:scale-[0.98]">
              Dodaj do koszyka
            </button>
            <p className="text-sm text-gray-400 mt-6 text-center">Wysyłka w 24h. Darmowa dostawa od 150 zł.</p>
          </div>
        </div>

        <section className="py-24 bg-[#F5F5F5]/30 border-t border-[#EBEBEB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight mb-8">{isKawa ? "Historia Ziarna" : "O Produkcie"}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{p.opis1}</p>
            {p.opis2 && <p className="text-gray-600 leading-relaxed">{p.opis2}</p>}
          </div>
        </section>
      </main>
    );
  };

  const CheckoutView = () => {
    const [step, setStep] = useState(1);
    const [dostawa, setDostawa] = useState(15);
    const sumaCzesciowa = sumaKoszyka;
    const kosztDostawyFinalny = sumaCzesciowa >= 150 ? 0 : dostawa;

const handleFormSubmit = (e) => {
      e.preventDefault(); // Blokuje przeładowanie strony
      if (step === 2) {
        setStep(3);
        wyczyscKoszyk();
        window.scrollTo(0, 0); // Przewija ekran do góry do napisu "Dziękujemy"
      }
    };

    return (
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12 items-start min-h-screen">
        <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 shadow-sm border border-[#EBEBEB] min-h-[600px]">
          {step !== 3 && (
            <div className="flex justify-between items-center mb-12 border-b border-[#EBEBEB] pb-6">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#111111]' : 'text-gray-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#111111] text-white' : 'bg-[#F5F5F5]'}`}>1</span>
                <span className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest hidden sm:block">Dane</span>
              </div>
              <div className="h-[1px] bg-[#EBEBEB] flex-grow mx-4"></div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#111111]' : 'text-gray-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= 2 ? 'bg-[#111111] text-white' : 'bg-[#F5F5F5]'}`}>2</span>
                <span className="font-['Montserrat'] font-bold text-xs uppercase tracking-widest hidden sm:block">Dostawa & Płatność</span>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            {step === 1 && (
              <div className="animate-[fadeIn_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight mb-6">Dane kontaktowe</h2>
                <div className="space-y-4 mb-10">
                  <input type="email" placeholder="Adres e-mail" required className="w-full border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                  <input type="tel" placeholder="Numer telefonu" required className="w-full border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                </div>
                <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight mb-6">Adres dostawy</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input type="text" placeholder="Imię" required className="w-1/2 border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                    <input type="text" placeholder="Nazwisko" required className="w-1/2 border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                  </div>
                  <input type="text" placeholder="Ulica i numer" required className="w-full border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                  <div className="flex gap-4">
                    <input type="text" placeholder="Kod pocztowy" required className="w-1/3 border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                    <input type="text" placeholder="Miasto" required className="w-2/3 border border-[#EBEBEB] p-4 focus:border-[#111111] outline-none transition-colors" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="mt-10 w-full bg-[#111111] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-5 hover:bg-gray-800 transition-colors">
                  Przejdź do dostawy
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-[fadeIn_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight mb-6">Metoda dostawy</h2>
                <div className="space-y-3 mb-10">
                  <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${dostawa === 15 ? 'border-[#111111] bg-[#F5F5F5]/30' : 'border-[#EBEBEB]'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="dostawa" checked={dostawa === 15} onChange={() => setDostawa(15)} className="accent-[#111111] w-4 h-4" />
                      <span className="font-['Montserrat'] font-bold text-sm uppercase">Kurier DPD</span>
                    </div>
                    <span className="font-bold">15.00 zł</span>
                  </label>
                  <label className={`flex items-center justify-between border p-4 cursor-pointer transition-colors ${dostawa === 13 ? 'border-[#111111] bg-[#F5F5F5]/30' : 'border-[#EBEBEB]'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="dostawa" checked={dostawa === 13} onChange={() => setDostawa(13)} className="accent-[#111111] w-4 h-4" />
                      <span className="font-['Montserrat'] font-bold text-sm uppercase">Paczkomat InPost</span>
                    </div>
                    <span className="font-bold">13.00 zł</span>
                  </label>
                </div>
                <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight mb-6">Metoda płatności</h2>
                <div className="space-y-3 mb-10">
                  <label className="flex items-center gap-4 border border-[#111111] p-4 cursor-pointer bg-[#F5F5F5]/30">
                    <input type="radio" name="platnosc" defaultChecked className="accent-[#111111] w-4 h-4" />
                    <span className="font-['Montserrat'] font-bold text-sm uppercase flex items-center gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Blik_logo.svg" alt="BLIK" className="h-4" />
                      BLIK
                    </span>
                  </label>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 border border-[#EBEBEB] text-[#111111] font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-5 hover:bg-[#F5F5F5] transition-colors">Wstecz</button>
                  <button type="submit" className="w-2/3 bg-[#111111] text-white font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-5 hover:bg-gray-800 transition-colors shadow-lg">Kupuję i płacę</button>
                </div>
              </div>
            )}
          </form>

          {step === 3 && (
            <div className="text-center py-10 animate-[fadeIn_0.4s_ease-out_forwards]">
              <i className="ph-fill ph-check-circle text-7xl text-green-600 mb-6"></i>
              <h2 className="text-4xl font-['Montserrat'] font-black uppercase tracking-tight mb-4">Dziękujemy!</h2>
              <p className="text-gray-600 mb-2">Twoje zamówienie zostało pomyślnie złożone i opłacone.</p>
              <p className="text-gray-500 text-sm mb-10">Numer zamówienia: <strong className="text-[#111111] font-['Montserrat']">#ARM-2026-8492</strong></p>
              <button onClick={() => navigate('home')} className="inline-block border-2 border-[#111111] text-[#111111] font-['Montserrat'] font-bold text-sm uppercase tracking-widest py-4 px-10 hover:bg-[#111111] hover:text-white transition-colors">
                Wróć na stronę główną
              </button>
            </div>
          )}
        </div>

        {step !== 3 && (
          <div className="w-full lg:w-2/5 bg-white p-8 border-t-4 border-[#111111] shadow-sm sticky top-24 hidden lg:block border border-[#EBEBEB]">
            <h3 className="font-['Montserrat'] font-black text-xl uppercase tracking-tight mb-6">Podsumowanie</h3>
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto no-scrollbar p-2 -m-2">
              {koszyk.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="relative">
                    <img src={item.obrazek} alt={item.nazwa} className="w-16 h-16 object-cover bg-[#F5F5F5] border border-[#EBEBEB]" />
                    <span className="absolute -top-2 -right-2 bg-[#111111] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold leading-none">{item.ilosc}</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-['Montserrat'] font-bold text-xs uppercase leading-tight">{item.nazwa}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">{item.wariant}</p>
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap">{(item.cena * item.ilosc).toFixed(2)} zł</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#EBEBEB] pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500"><span>Suma częściowa</span><span>{sumaCzesciowa.toFixed(2)} zł</span></div>
              <div className="flex justify-between text-gray-500"><span>Dostawa</span>{kosztDostawyFinalny === 0 ? <span className="text-green-600 font-bold">Darmowa!</span> : <span>{kosztDostawyFinalny.toFixed(2)} zł</span>}</div>
            </div>
            <div className="border-t border-[#EBEBEB] mt-6 pt-6 flex justify-between items-center">
              <span className="font-['Montserrat'] font-bold uppercase">Do zapłaty</span>
              <span className="font-['Montserrat'] font-black text-3xl">{(sumaCzesciowa + kosztDostawyFinalny).toFixed(2)} zł</span>
            </div>
          </div>
        )}
      </main>
    );
  };

  const PrivacyPolicyView = () => (
    <main className="pt-20 min-h-screen">
      <header className="pt-16 pb-12 bg-[#F5F5F5] border-b border-[#EBEBEB] animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#111111] text-white font-['Montserrat'] font-bold text-[10px] uppercase tracking-widest px-3 py-1 mb-6">Informacje Prawne</span>
          <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black tracking-tighter uppercase mb-4">Polityka Prywatności</h1>
          <p className="text-gray-500 font-medium">Ostatnia aktualizacja: 21 kwietnia 2026</p>
        </div>
      </header>
      <div className="py-16 md:py-24 animate-[fadeIn_0.6s_ease-out_forwards]" style={{animationDelay: '0.1s'}}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-gray-600 leading-relaxed space-y-10">
            <section>
              <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight text-[#111111] mb-4">1. Postanowienia Ogólne</h2>
              <p>Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z usług sklepu internetowego Aroma Roastery.</p>
            </section>
            <section>
              <h2 className="text-2xl font-['Montserrat'] font-black uppercase tracking-tight text-[#111111] mb-4">2. Jakie dane zbieramy i dlaczego?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Realizacja zamówień:</strong> Imię, nazwisko, adres wysyłki, numer telefonu, adres e-mail.</li>
                <li><strong>Konto użytkownika:</strong> Jeśli zdecydujesz się założyć u nas konto, przechowujemy historię Twoich zamówień.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );

  // --- GŁÓWNY RENDER ---
  return (
    <div className="bg-white text-[#111111] antialiased selection:bg-[#111111] selection:text-white font-['Inter']">
      <Navbar />
      <CartDrawer />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'product' && <ProductView />}
      {currentView === 'kasa' && <CheckoutView />}
      {currentView === 'polityka' && <PrivacyPolicyView />}

      <Footer />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}