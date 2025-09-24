import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  ClipboardDocumentIcon,
  CogIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  AtSymbolIcon,
  PhoneIcon,
  ShareIcon,
  SunIcon,
  MoonIcon,
  HeartIcon,
  StarIcon,
  FunnelIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  XMarkIcon,
  ClipboardIcon,
  PlusIcon,
  PencilIcon,
  KeyIcon,
  FolderIcon,
  ServerIcon,
  ShieldExclamationIcon,
  BugAntIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  LockClosedIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';
import { dorkTemplates, dorkCategories, getTemplatesByCategory, searchTemplates } from '../data/dorkTemplates';

interface TargetingParams {
  username: string;
  location: string;
  state: string;
  country: string;
  organization: string;
  emailDomain: string;
  phonePattern: string;
  socialHandle: string;
}

interface QueryMetrics {
  complexity: number;
  riskScore: number;
  estimatedResults: string;
  executionTime: number;
}

interface QueryHistory {
  id: string;
  query: string;
  category: string;
  timestamp: Date;
  url: string;
}

interface BatchQuery {
  id: string;
  name: string;
  query: string;
}

const iconMapLocal: { [key: string]: React.ComponentType<any> } = {
  KeyIcon, FolderIcon, ServerIcon, ExclamationTriangleIcon,
  ShieldExclamationIcon, BugAntIcon, InformationCircleIcon,
  UserIcon, ShoppingCartIcon, GlobeAltIcon, LockClosedIcon,
  DevicePhoneMobileIcon, DocumentTextIcon, CircleStackIcon, CogIcon
};

const GoogleDorkingTool: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [queryHistory, setQueryHistory] = useState<any[]>([]);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  // New targeting parameters
  const [targetingParams, setTargetingParams] = useState<TargetingParams>({
    username: '',
    location: '',
    state: '',
    country: '',
    organization: '',
    emailDomain: '',
    phonePattern: '',
    socialHandle: ''
  });
  
  // UI enhancements
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showTargeting, setShowTargeting] = useState<boolean>(false);
  const [showMetrics, setShowMetrics] = useState<boolean>(false);
  const [queryMetrics, setQueryMetrics] = useState<QueryMetrics | null>(null);
  const [batchQueries, setBatchQueries] = useState<BatchQuery[]>([]);
  const [showBatch, setShowBatch] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'name' | 'risk' | 'complexity'>('name');
  const [filterRisk, setFilterRisk] = useState<string>('');
  const [filterComplexity, setFilterComplexity] = useState<string>('');
  
  // Advanced search options
  const [siteFilter, setSiteFilter] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [exactPhrase, setExactPhrase] = useState<string>('');
  const [excludeWords, setExcludeWords] = useState<string>('');
  
  // Document search options
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);
  
  useEffect(() => {
    // Load history and preferences from localStorage
    const savedHistory = localStorage.getItem('dorkQueryHistory');
    if (savedHistory) {
      setQueryHistory(JSON.parse(savedHistory));
    }
    
    const savedFavorites = localStorage.getItem('dorkingFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedDarkMode = localStorage.getItem('dorkingDarkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('dorkingFavorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('dorkingDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const saveToHistory = (query: string, category?: string) => {
    const newEntry: QueryHistory = {
      id: Date.now().toString(),
      query,
      category: category || 'Custom',
      timestamp: new Date(),
      url: generateGoogleUrl(query)
    };
    
    const updatedHistory = [newEntry, ...queryHistory.slice(0, 49)]; // Keep last 50
    setQueryHistory(updatedHistory);
    localStorage.setItem('dorkQueryHistory', JSON.stringify(updatedHistory));
  };

  const generateGoogleUrl = (query: string): string => {
    let finalQuery = query;
    
    // Add advanced search parameters
    if (siteFilter) finalQuery += ` site:${siteFilter}`;
    if (fileType) finalQuery += ` filetype:${fileType}`;
    if (exactPhrase) finalQuery += ` "${exactPhrase}"`;
    if (excludeWords) finalQuery += ` -${excludeWords.split(' ').join(' -')}`;
    
    // Add document type filters
    if (documentTypes.length > 0) {
      const docQuery = documentTypes.map(type => `filetype:${type}`).join(' OR ');
      finalQuery += ` (${docQuery})`;
    }
    
    const encodedQuery = encodeURIComponent(finalQuery);
    let url = `https://www.google.com/search?q=${encodedQuery}`;
    
    // Add additional parameters
    if (dateRange) url += `&tbs=qdr:${dateRange}`;
    if (language) url += `&lr=lang_${language}`;
    
    return url;
  };

  const executeSearch = (query?: string, category?: string) => {
    const searchQuery = query || customQuery;
    if (!searchQuery.trim()) return;
    
    const advancedQuery = generateAdvancedQuery(searchQuery);
    const finalQuery = buildTargetedQuery(advancedQuery);
    const metrics = analyzeQuery(finalQuery);
    
    setQueryMetrics(metrics);
    const url = generateGoogleUrl(finalQuery);
    
    saveToHistory(finalQuery, category);
    window.open(url, '_blank');
  };

  const executeCustomSearch = () => {
    if (customQuery.trim()) {
      executeSearch(customQuery, 'Custom');
    }
  };

  const executeTemplateSearch = (template: any) => {
    const advancedQuery = generateAdvancedQuery(template.query);
    const finalQuery = buildTargetedQuery(advancedQuery);
    const metrics = analyzeQuery(finalQuery);
    
    setQueryMetrics(metrics);
    const url = generateGoogleUrl(finalQuery);
    
    saveToHistory(finalQuery, template.category);
    window.open(url, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Utility functions for targeting parameters
  const buildTargetedQuery = (baseQuery: string): string => {
    let query = baseQuery;
    
    if (targetingParams.username) {
      query += ` "${targetingParams.username}"`;
    }
    if (targetingParams.location) {
      query += ` "${targetingParams.location}"`;
    }
    if (targetingParams.state) {
      query += ` "${targetingParams.state}"`;
    }
    if (targetingParams.country) {
      query += ` "${targetingParams.country}"`;
    }
    if (targetingParams.organization) {
      query += ` site:${targetingParams.organization}`;
    }
    if (targetingParams.emailDomain) {
      query += ` "${targetingParams.emailDomain}"`;
    }
    if (targetingParams.phonePattern) {
      query += ` "${targetingParams.phonePattern}"`;
    }
    if (targetingParams.socialHandle) {
      query += ` "${targetingParams.socialHandle}"`;
    }
    
    return query;
  };

  const generateAdvancedQuery = (baseQuery: string): string => {
    let query = baseQuery;
    
    if (siteFilter) query += ` site:${siteFilter}`;
    if (fileType) query += ` filetype:${fileType}`;
    if (exactPhrase) query += ` "${exactPhrase}"`;
    if (excludeWords) query += ` -${excludeWords.split(' ').join(' -')}`;
    
    if (documentTypes.length > 0) {
      const docQuery = documentTypes.map(type => `filetype:${type}`).join(' OR ');
      query += ` (${docQuery})`;
    }
    
    return query;
  };

  const analyzeQuery = (query: string): QueryMetrics => {
    const complexity = Math.min(10, Math.floor(query.length / 10) + (query.match(/["\-\+\*]/g) || []).length);
    const riskScore = Math.min(10, Math.floor(complexity * 0.8) + (query.includes('inurl:') ? 2 : 0));
    const estimatedResults = complexity > 7 ? '1K-10K' : complexity > 4 ? '10K-100K' : '100K+';
    const executionTime = Math.floor(Math.random() * 500) + 100;
    
    return { complexity, riskScore, estimatedResults, executionTime };
  };

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const addToBatch = (template: any) => {
    const batchQuery: BatchQuery = {
      id: Date.now().toString(),
      name: template.name,
      query: template.query
    };
    setBatchQueries(prev => [...prev, batchQuery]);
  };

  const executeBatch = async () => {
    for (const query of batchQueries) {
      executeTemplateSearch({ query: query.query, name: query.name });
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  };

  const exportData = (format: 'json' | 'csv' | 'xml') => {
    const data = {
      history: queryHistory,
      favorites: favorites,
      timestamp: new Date().toISOString()
    };
    
    let content = '';
    let filename = '';
    
    switch (format) {
      case 'json':
        content = JSON.stringify(data, null, 2);
        filename = 'dorking-data.json';
        break;
      case 'csv':
        content = 'Query,Category,Timestamp\n' + 
          queryHistory.map(h => `"${h.query}","${h.category}","${h.timestamp}"`).join('\n');
        filename = 'dorking-history.csv';
        break;
      case 'xml':
        content = `<?xml version="1.0"?>\n<data>\n${queryHistory.map(h => 
          `  <query>\n    <text>${h.query}</text>\n    <category>${h.category}</category>\n    <timestamp>${h.timestamp}</timestamp>\n  </query>`
        ).join('\n')}\n</data>`;
        filename = 'dorking-data.xml';
        break;
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    setQueryHistory([]);
    localStorage.removeItem('dorkQueryHistory');
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(queryHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dork-query-history.json';
    link.click();
  };

  const importHistory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setQueryHistory(imported);
          localStorage.setItem('dorkQueryHistory', JSON.stringify(imported));
        } catch (error) {
          console.error('Error importing history:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleDocumentType = (type: string) => {
    setDocumentTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  let filteredTemplates = searchTerm 
    ? searchTemplates(searchTerm)
    : selectedCategory 
      ? getTemplatesByCategory(selectedCategory)
      : dorkTemplates;
  
  // Apply risk filter
  if (filterRisk) {
    filteredTemplates = filteredTemplates.filter(template => template.riskLevel === filterRisk);
  }
  
  // Apply complexity filter
  if (filterComplexity) {
    filteredTemplates = filteredTemplates.filter(template => {
      const complexity = template.complexity || 'basic';
      switch (filterComplexity) {
        case 'low': return complexity === 'basic';
        case 'medium': return complexity === 'intermediate';
        case 'high': return complexity === 'advanced' || complexity === 'expert';
        default: return true;
      }
    });
  }
  
  // Apply sorting
  filteredTemplates.sort((a, b) => {
    switch (sortBy) {
      case 'risk':
        const riskOrder = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
        return (riskOrder[b.riskLevel as keyof typeof riskOrder] || 0) - (riskOrder[a.riskLevel as keyof typeof riskOrder] || 0);
      case 'complexity':
        const complexityOrder = { 'basic': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
        return (complexityOrder[b.complexity as keyof typeof complexityOrder] || 1) - (complexityOrder[a.complexity as keyof typeof complexityOrder] || 1);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const selectedCategoryData = dorkCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`min-h-screen transition-colors duration-300 p-4 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Enhanced Glassmorphism Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-teal-500/15 to-green-500/15 rounded-full blur-2xl animate-pulse delay-3000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-400/35 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-400/30 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-400/25 rounded-full animate-bounce delay-2500"></div>
        <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-teal-400/30 rounded-full animate-bounce delay-3000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <h1 className={`text-4xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🔍 Ultimate Google Dorking Tool
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full transition-colors ${
                darkMode 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </div>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The most comprehensive Google dorking tool with advanced targeting, OSINT capabilities, and professional templates.
          </p>
        </div>

        {/* Enhanced Main Search Bar with Premium Glassmorphism */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
          <div className="relative z-10">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Enter your custom Google dork query..."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && executeCustomSearch()}
              />
            </div>
            <button
              onClick={executeCustomSearch}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Search
            </button>
            <button
              onClick={() => copyToClipboard(generateGoogleUrl(customQuery))}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              title="Copy URL"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowTargeting(!showTargeting)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Targeting
            </button>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              Advanced
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <ClockIcon className="w-4 h-4" />
              History ({queryHistory.length})
            </button>
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <ChartBarIcon className="w-4 h-4" />
              Metrics
            </button>
            <button
              onClick={() => setShowBatch(!showBatch)}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <FunnelIcon className="w-4 h-4" />
              Batch ({batchQueries.length})
            </button>
            <div className="relative">
              <button
                onClick={() => document.getElementById('export-menu')?.classList.toggle('hidden')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Export
              </button>
              <div id="export-menu" className="hidden absolute top-full left-0 mt-1 bg-gray-800 rounded-lg shadow-lg z-10">
                <button onClick={() => exportData('json')} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 rounded-t-lg">JSON</button>
                <button onClick={() => exportData('csv')} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700">CSV</button>
                <button onClick={() => exportData('xml')} className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700 rounded-b-lg">XML</button>
              </div>
            </div>
            <label className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer">
              <ArrowUpTrayIcon className="w-4 h-4" />
              Import
              <input type="file" accept=".json" onChange={importHistory} className="hidden" />
            </label>
          </div>
          </div>
        </div>

        {/* Targeting Parameters Section */}
        {showTargeting && (
          <div className={`mt-6 p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              <UserIcon className="w-5 h-5" />
              Advanced Targeting Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Username Pattern
                </label>
                <input
                  type="text"
                  value={targetingParams.username}
                  onChange={(e) => setTargetingParams(prev => ({...prev, username: e.target.value}))}
                  placeholder="john.doe, admin, user123"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location/City
                </label>
                <input
                  type="text"
                  value={targetingParams.location}
                  onChange={(e) => setTargetingParams(prev => ({...prev, location: e.target.value}))}
                  placeholder="New York, London, Tokyo"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  State/Province
                </label>
                <input
                  type="text"
                  value={targetingParams.state}
                  onChange={(e) => setTargetingParams(prev => ({...prev, state: e.target.value}))}
                  placeholder="California, Texas, Ontario"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Country
                </label>
                <input
                  type="text"
                  value={targetingParams.country}
                  onChange={(e) => setTargetingParams(prev => ({...prev, country: e.target.value}))}
                  placeholder="USA, UK, Canada, Germany"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Organization
                </label>
                <input
                  type="text"
                  value={targetingParams.organization}
                  onChange={(e) => setTargetingParams(prev => ({...prev, organization: e.target.value}))}
                  placeholder="Microsoft, Google, Apple"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Domain
                </label>
                <input
                  type="text"
                  value={targetingParams.emailDomain}
                  onChange={(e) => setTargetingParams(prev => ({...prev, emailDomain: e.target.value}))}
                  placeholder="gmail.com, company.com"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Pattern
                </label>
                <input
                  type="text"
                  value={targetingParams.phonePattern}
                  onChange={(e) => setTargetingParams(prev => ({...prev, phonePattern: e.target.value}))}
                  placeholder="555-*, +1-*, (555)"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Social Handle
                </label>
                <input
                  type="text"
                  value={targetingParams.socialHandle}
                  onChange={(e) => setTargetingParams(prev => ({...prev, socialHandle: e.target.value}))}
                  placeholder="@username, handle123"
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setTargetingParams({
                  username: '',
                  location: '',
                  state: '',
                  country: '',
                  organization: '',
                  emailDomain: '',
                  phonePattern: '',
                  socialHandle: ''
                })}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  setTargetingParams({
                    username: 'admin',
                    location: 'New York',
                    state: 'NY',
                    country: 'USA',
                    organization: 'corp',
                    emailDomain: 'company.com',
                    phonePattern: '555-*',
                    socialHandle: '@admin'
                  });
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Load Example
              </button>
            </div>
          </div>
        )}

        {/* Query Metrics Section */}
        {showMetrics && queryMetrics && (
          <div className={`mt-6 p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              <ChartBarIcon className="w-5 h-5" />
              Query Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${queryMetrics.complexity <= 3 ? 'text-green-500' : queryMetrics.complexity <= 7 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {queryMetrics.complexity <= 3 ? 'Low' : queryMetrics.complexity <= 7 ? 'Medium' : 'High'}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complexity</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${queryMetrics.riskScore < 3 ? 'text-green-500' : queryMetrics.riskScore < 7 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {queryMetrics.riskScore}/10
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Risk Score</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {queryMetrics.estimatedResults.toLocaleString()}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Est. Results</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {queryMetrics.executionTime}s
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exec Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Batch Queries Section */}
        {showBatch && (
          <div className={`mt-6 p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              <FunnelIcon className="w-5 h-5" />
              Batch Query Execution
            </h3>
            {batchQueries.length > 0 ? (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {batchQueries.length} queries in batch
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={executeBatch}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Execute All
                      </button>
                      <button
                        onClick={() => setBatchQueries([])}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                      >
                        Clear Batch
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {batchQueries.map((batchQuery, index) => (
                    <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} flex justify-between items-center`}>
                      <span className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {batchQuery.query.length > 60 ? `${batchQuery.query.substring(0, 60)}...` : batchQuery.query}
                      </span>
                      <button
                        onClick={() => setBatchQueries(batchQueries.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FunnelIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No queries in batch. Add queries using the "Add to Batch" button on templates.</p>
              </div>
            )}
          </div>
        )}

        {/* Advanced Search Options */}
        {showAdvanced && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Advanced Search Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Site Filter</label>
                <input
                  type="text"
                  value={siteFilter}
                  onChange={(e) => setSiteFilter(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">File Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">DOC</option>
                  <option value="docx">DOCX</option>
                  <option value="xls">XLS</option>
                  <option value="xlsx">XLSX</option>
                  <option value="ppt">PPT</option>
                  <option value="pptx">PPTX</option>
                  <option value="txt">TXT</option>
                  <option value="sql">SQL</option>
                  <option value="xml">XML</option>
                  <option value="json">JSON</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any time</option>
                  <option value="d">Past 24 hours</option>
                  <option value="w">Past week</option>
                  <option value="m">Past month</option>
                  <option value="y">Past year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Exact Phrase</label>
                <input
                  type="text"
                  value={exactPhrase}
                  onChange={(e) => setExactPhrase(e.target.value)}
                  placeholder="exact phrase"
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Exclude Words</label>
                <input
                  type="text"
                  value={excludeWords}
                  onChange={(e) => setExcludeWords(e.target.value)}
                  placeholder="word1 word2"
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
            
            {/* Document Type Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Types</label>
              <div className="flex flex-wrap gap-2">
                {['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'].map(type => (
                  <button
                    key={type}
                    onClick={() => toggleDocumentType(type)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      documentTypes.includes(type)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/20 text-gray-300 hover:bg-white/30'
                    }`}
                  >
                    {type?.toUpperCase() || ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Query History */}
        {showHistory && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Query History</h3>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Clear All
              </button>
            </div>
            
            <div className="max-h-64 overflow-y-auto space-y-2">
              {queryHistory.map(entry => (
                <div key={entry.id} className="bg-white/10 rounded-lg p-3 flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-white font-medium">{entry.query}</div>
                    <div className="text-gray-400 text-sm">
                      {entry.category} • {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => executeSearch(entry.query, entry.category)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                    >
                      Search
                    </button>
                    <button
                      onClick={() => copyToClipboard(entry.query)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
              {queryHistory.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No search history yet. Start dorking to build your history!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Filtering and Sorting Controls */}
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'risk' | 'complexity')}
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="name">Name (A-Z)</option>
                <option value="risk">Risk Level</option>
                <option value="complexity">Complexity</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by Risk
              </label>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by Complexity
              </label>
              <select
                value={filterComplexity}
                onChange={(e) => setFilterComplexity(e.target.value as 'all' | 'Low' | 'Medium' | 'High')}
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="all">All Complexity</option>
                <option value="Low">Low Complexity</option>
                <option value="Medium">Medium Complexity</option>
                <option value="High">High Complexity</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSortBy('name');
                  setFilterRisk('all');
                  setFilterComplexity('all');
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <XMarkIcon className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Template Search */}
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search dork templates..."
                className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {dorkCategories.map(category => {
            const IconComponent = iconMapLocal[category.icon];
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? '' : category.id);
                  setSearchTerm('');
                }}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden backdrop-blur-sm ${
                  isSelected
                    ? `${category.color} text-white shadow-2xl border border-white/20`
                    : `${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/90 text-gray-300 border-gray-700/50' : 'bg-white/80 hover:bg-gray-50/90 text-gray-700 border-gray-200/50'} border hover:border-blue-300/50`
                }`}
              >
                {/* Category button glow effect */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
                <div className="relative z-10">
                <div className="flex flex-col items-center space-y-2">
                  {IconComponent && <IconComponent className="w-8 h-8" />}
                  <span className="text-sm font-medium text-center leading-tight">
                    {category.name}
                  </span>
                  <span className="text-xs opacity-75">
                    ({getTemplatesByCategory(category.id).length})
                  </span>
                </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Info */}
        {selectedCategoryData && (
          <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedCategoryData.name}
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedCategoryData.description}</p>
          </div>
        )}

        {/* Dork Templates */}
        <div className="grid gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => {
              const riskColors = {
                low: darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800',
                medium: darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800',
                high: darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
              };

              const complexityColors = {
                low: darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800',
                medium: darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800',
                high: darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800'
              };

              const isFavorite = favorites.includes(template.id);
              const isInBatch = batchQueries.some(q => q.id === template.id);

              return (
                <div
                  key={template.id}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden backdrop-blur-sm ${
                    darkMode 
                      ? 'bg-gray-800/80 border-gray-700/50 hover:bg-gray-750/90' 
                      : 'bg-white/80 border-gray-200/50 hover:bg-gray-50/90'
                  }`}
                >
                  {/* Premium card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {template.name}
                        </h3>
                        <button
                          onClick={() => toggleFavorite(template.id)}
                          className={`p-1 rounded transition-colors ${
                            isFavorite 
                              ? 'text-yellow-500 hover:text-yellow-600' 
                              : `${darkMode ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`
                          }`}
                        >
                          <StarIcon className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1 bg-gray-200 p-2 rounded-lg">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          riskColors[template.riskLevel]
                        }`}>
                          {template.riskLevel?.toUpperCase() || 'UNKNOWN'} RISK
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          complexityColors[template.complexity]
                        }`}>
                          {template.complexity?.toUpperCase() || 'UNKNOWN'}
                        </span>
                        {template.targetType && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {template.targetType?.toUpperCase() || ''}
                          </span>
                        )}
                        {template.tags.map(tag => (
                          <span
                            key={tag}
                            className={`px-2 py-1 rounded-full text-xs ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-lg p-3 mb-4 ${
                    darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <code className={`text-sm font-mono break-all ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {template.query}
                    </code>
                  </div>

                  <div className="flex space-x-2 flex-wrap gap-2">
                    <button
                      onClick={() => executeTemplateSearch(template)}
                      className="flex-1 min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <MagnifyingGlassIcon className="w-4 h-4" />
                      <span>Search</span>
                    </button>
                    <button
                       onClick={() => copyToClipboard(template.query)}
                       className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                         darkMode 
                           ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                           : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                       }`}
                     >
                       <ClipboardIcon className="w-4 h-4" />
                     </button>


                  </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className={`w-16 h-16 mx-auto mb-4 ${
                darkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No templates found
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          )}
        </div>

        {/* Targeting Parameters Section */}
        {showTargeting && (
          <div className={`mt-8 p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Advanced Targeting Parameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Username
                </label>
                <input
                  type="text"
                  value={targetingParams.username}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="john.doe"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </label>
                <input
                  type="text"
                  value={targetingParams.location}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="New York"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  State
                </label>
                <input
                  type="text"
                  value={targetingParams.state}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="California"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Country
                </label>
                <input
                  type="text"
                  value={targetingParams.country}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="United States"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Organization
                </label>
                <input
                  type="text"
                  value={targetingParams.organization}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, organization: e.target.value }))}
                  placeholder="company.com"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Domain
                </label>
                <input
                  type="text"
                  value={targetingParams.emailDomain}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, emailDomain: e.target.value }))}
                  placeholder="@company.com"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Pattern
                </label>
                <input
                  type="text"
                  value={targetingParams.phonePattern}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, phonePattern: e.target.value }))}
                  placeholder="555-*"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Social Handle
                </label>
                <input
                  type="text"
                  value={targetingParams.socialHandle}
                  onChange={(e) => setTargetingParams(prev => ({ ...prev, socialHandle: e.target.value }))}
                  placeholder="@username"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Query Metrics */}
        {showMetrics && queryMetrics && (
          <div className={`mt-8 p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Query Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {queryMetrics.complexity}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Complexity</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {queryMetrics.riskScore}/10
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Risk Score</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {queryMetrics.estimatedResults}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Est. Results</div>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {queryMetrics.executionTime}ms
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exec Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Batch Queries */}
        {showBatch && batchQueries.length > 0 && (
          <div className={`mt-8 p-6 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Batch Queries ({batchQueries.length})
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={executeBatch}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <PlayIcon className="w-4 h-4" />
                  <span>Execute All</span>
                </button>
                <button
                  onClick={() => setBatchQueries([])}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {batchQueries.map((query, index) => (
                <div key={query.id} className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} flex justify-between items-center`}>
                  <div className="flex-1">
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{query.name}</div>
                    <code className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{query.query}</code>
                  </div>
                  <button
                    onClick={() => setBatchQueries(prev => prev.filter(q => q.id !== query.id))}
                    className={`p-2 rounded transition-colors ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-12 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>⚠️ Use responsibly and in accordance with Google's Terms of Service</p>
          <p className="mt-2">This tool is for educational and authorized testing purposes only</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleDorkingTool;