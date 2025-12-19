import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, History, StickyNote, Moon, Sun, Menu } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/RWF';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('converter');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('RWF');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [result, setResult] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [conversionHistory, setConversionHistory] = useState([]);
  const [notes, setNotes] = useState([
    { id: 1, text: 'Example note 1' },
    { id: 2, text: 'Example note 2' }
  ]);
  const [newNote, setNewNote] = useState('');

  const currencies = ['RWF', 'RUB', 'USD', 'EUR'];

  // Fetch exchange rates
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      setExchangeRates(data.rates);
      setLoading(false);
    } catch (err) {
      setError('Unable to fetch exchange rates. Please try again later.');
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setError('');
    let convertedAmount;

    if (fromCurrency === 'RWF') {
      // Converting from RWF to other currency
      convertedAmount = parseFloat(amount) * (exchangeRates[toCurrency] || 0);
    } else if (toCurrency === 'RWF') {
      // Converting from other currency to RWF
      convertedAmount = parseFloat(amount) / (exchangeRates[fromCurrency] || 1);
    } else {
      // Converting between two non-RWF currencies
      const amountInRWF = parseFloat(amount) / (exchangeRates[fromCurrency] || 1);
      convertedAmount = amountInRWF * (exchangeRates[toCurrency] || 0);
    }

    const formattedResult = convertedAmount.toFixed(2);
    setResult(formattedResult);

    // Add to history
    const historyEntry = {
      id: Date.now(),
      from: fromCurrency,
      to: toCurrency,
      amount: parseFloat(amount),
      result: parseFloat(formattedResult),
      timestamp: new Date().toLocaleString()
    };
    setConversionHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
  };

  const saveNote = () => {
    if (newNote.trim()) {
      setNotes(prev => [...prev, { id: Date.now(), text: newNote }]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getExchangeRate = () => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return 'N/A';
    
    if (fromCurrency === 'RWF') {
      return exchangeRates[toCurrency]?.toFixed(4);
    } else if (toCurrency === 'RWF') {
      return (1 / exchangeRates[fromCurrency])?.toFixed(4);
    } else {
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      return rate?.toFixed(4);
    }
  };

  const theme = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const buttonBg = isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400';
  const inputBg = isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900';

  return (
    <div className={`min-h-screen ${theme} transition-colors duration-300`}>
      {/* Header */}
      <div className={`${cardBg} shadow-lg p-4`}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${buttonBg}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-800"></div>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6">
        {currentView === 'welcome' && (
          <div className="text-center space-y-6 py-8">
            <h1 className="text-4xl font-bold">Welcome to</h1>
            <h2 className="text-5xl font-bold text-orange-500">DiiFlip</h2>
            <div className="text-6xl">🐱</div>
            <button
              onClick={() => setCurrentView('converter')}
              className="w-full bg-gray-700 text-white py-4 rounded-lg text-xl font-semibold hover:bg-gray-600"
            >
              Get Started
            </button>
            
            {/* Features */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
                Features
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  🐾
                </div>
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setCurrentView('converter')}
                  className={`${buttonBg} p-6 rounded-lg flex flex-col items-center gap-2`}
                >
                  <ArrowLeftRight size={32} />
                  <span className="text-xs">Currency Conversion</span>
                </button>
                <button
                  onClick={() => setCurrentView('history')}
                  className={`${buttonBg} p-6 rounded-lg flex flex-col items-center gap-2`}
                >
                  <History size={32} />
                  <span className="text-xs">Convert History</span>
                </button>
                <button
                  onClick={() => setCurrentView('history')}
                  className={`${buttonBg} p-6 rounded-lg flex flex-col items-center gap-2`}
                >
                  <StickyNote size={32} />
                  <span className="text-xs">Notes Reminders</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'converter' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-3xl font-bold mb-2">DiiFlip</h2>
              
              <div className="text-5xl my-4">🐱</div>
            </div>

            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">Loading exchange rates...</div>
            ) : (
              <>
                <div>
                  <label className="block mb-2 font-semibold">Enter amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full p-4 rounded-lg ${inputBg} border-2 border-gray-600 focus:border-orange-500 outline-none`}
                    placeholder="0.00"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFromCurrency('RWF')}
                    className={`py-3 rounded-lg font-semibold ${
                      fromCurrency === 'RWF' ? 'bg-orange-500 text-white' : buttonBg
                    }`}
                  >
                    RWF
                  </button>
                  <button
                    onClick={() => setFromCurrency('RUB')}
                    className={`py-3 rounded-lg font-semibold ${
                      fromCurrency === 'RUB' ? 'bg-orange-500 text-white' : buttonBg
                    }`}
                  >
                    RUB
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={swapCurrencies}
                    className={`p-3 rounded-full ${buttonBg}`}
                  >
                    <ArrowLeftRight size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {currencies.filter(c => c !== fromCurrency).map(currency => (
                    <button
                      key={currency}
                      onClick={() => setToCurrency(currency)}
                      className={`py-3 rounded-lg font-semibold ${
                        toCurrency === currency ? 'bg-orange-500 text-white' : buttonBg
                      }`}
                    >
                      {currency}
                    </button>
                  ))}
                </div>

                <button
                  onClick={convertCurrency}
                  className="w-full bg-gray-700 text-white py-4 rounded-lg text-xl font-semibold hover:bg-gray-600"
                >
                  Convert
                </button>

                <div className={`${cardBg} p-6 rounded-lg text-center`}>
                  <p className="text-sm mb-2">Conversion Result Here</p>
                  {result && (
                    <div>
                      <p className="text-3xl font-bold text-orange-500">
                        {result} {toCurrency}
                      </p>
                      <p className="text-sm mt-2">
                        1 {fromCurrency} = {getExchangeRate()} {toCurrency}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCurrentView('history')}
                  className={`w-full ${buttonBg} py-3 rounded-lg font-semibold`}
                >
                  View History & Notes
                </button>
              </>
            )}
          </div>
        )}

        {currentView === 'history' && (
          <div className="space-y-6">
            <button
              onClick={() => setCurrentView('converter')}
              className={`${buttonBg} px-4 py-2 rounded-lg`}
            >
              ← Back
            </button>

            <div>
              <h3 className="text-2xl font-bold mb-4">History & Notes</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Conversion History</h4>
                <div className="space-y-2">
                  {conversionHistory.length === 0 ? (
                    <p className={`${cardBg} p-4 rounded-lg text-center text-gray-500`}>
                      No conversion history yet
                    </p>
                  ) : (
                    conversionHistory.map(entry => (
                      <div key={entry.id} className={`${cardBg} p-3 rounded-lg`}>
                        {entry.amount} {entry.from} = {entry.result} {entry.to}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={`${cardBg} p-6 rounded-lg`}>
                <h4 className="text-xl font-bold mb-4">Notes</h4>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your note here......"
                  className={`w-full p-4 rounded-lg ${inputBg} border-2 border-gray-600 focus:border-orange-500 outline-none mb-4`}
                  rows="4"
                />
                <button
                  onClick={saveNote}
                  className="w-full bg-gray-700 text-white py-3 rounded-full font-semibold hover:bg-gray-600 mb-4"
                >
                  Save Note
                </button>

                <div className="space-y-2">
                  {notes.map(note => (
                    <button
                      key={note.id}
                      onClick={() => deleteNote(note.id)}
                      className={`w-full ${buttonBg} py-3 rounded-full text-left px-4`}
                    >
                      {note.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer paw print */}
      <div className="fixed bottom-4 right-4 text-4xl opacity-50">
        🐾
      </div>
    </div>
  );
};

export default App;