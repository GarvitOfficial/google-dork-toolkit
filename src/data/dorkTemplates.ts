export interface DorkTemplate {
  id: string;
  name: string;
  query: string;
  category: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  targetType?: 'username' | 'location' | 'organization' | 'email' | 'phone' | 'general';
}

export interface DorkCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count?: number;
}

export const dorkCategories: DorkCategory[] = [
  // Original Categories (Enhanced)
  {
    id: 'passwords',
    name: 'Files Containing Passwords',
    description: 'Find files that may contain password information',
    icon: 'KeyIcon',
    color: 'bg-red-500'
  },
  {
    id: 'directories',
    name: 'Sensitive Directories',
    description: 'Discover exposed directories and file listings',
    icon: 'FolderIcon',
    color: 'bg-orange-500'
  },
  {
    id: 'webserver',
    name: 'Web Server Detection',
    description: 'Identify web server types and versions',
    icon: 'ServerIcon',
    color: 'bg-blue-500'
  },
  {
    id: 'vulnerable-files',
    name: 'Vulnerable Files',
    description: 'Find potentially vulnerable files and scripts',
    icon: 'ExclamationTriangleIcon',
    color: 'bg-red-600'
  },
  {
    id: 'errors',
    name: 'Error Messages',
    description: 'Find pages with error messages revealing sensitive info',
    icon: 'BugAntIcon',
    color: 'bg-yellow-500'
  },
  {
    id: 'juicy-info',
    name: 'Files Containing Juicy Info',
    description: 'Discover files with potentially valuable information',
    icon: 'InformationCircleIcon',
    color: 'bg-purple-500'
  },
  {
    id: 'usernames',
    name: 'Username Intelligence',
    description: 'Find usernames, profiles, and identity information',
    icon: 'UserIcon',
    color: 'bg-green-500'
  },
  {
    id: 'login',
    name: 'Login Portals & Authentication',
    description: 'Find login pages and authentication portals',
    icon: 'LockClosedIcon',
    color: 'bg-gray-600'
  },
  {
    id: 'devices',
    name: 'IoT & Connected Devices',
    description: 'Discover internet-connected devices and interfaces',
    icon: 'DevicePhoneMobileIcon',
    color: 'bg-cyan-500'
  },
  {
    id: 'databases',
    name: 'Database Files & Dumps',
    description: 'Locate database files and dumps',
    icon: 'CircleStackIcon',
    color: 'bg-emerald-600'
  },
  {
    id: 'config',
    name: 'Configuration Files',
    description: 'Find configuration and settings files',
    icon: 'CogIcon',
    color: 'bg-slate-600'
  },
  // New Advanced Categories
  {
    id: 'social-media',
    name: 'Social Media Intelligence',
    description: 'Find social media profiles, posts, and user data',
    icon: 'ChatBubbleLeftRightIcon',
    color: 'bg-blue-600'
  },
  {
    id: 'government',
    name: 'Government & Military Files',
    description: 'Discover government documents and military information',
    icon: 'BuildingLibraryIcon',
    color: 'bg-red-700'
  },
  {
    id: 'financial',
    name: 'Financial Information',
    description: 'Find financial documents, reports, and payment data',
    icon: 'CurrencyDollarIcon',
    color: 'bg-green-700'
  },
  {
    id: 'medical',
    name: 'Medical Records & Health Data',
    description: 'Locate medical records and healthcare information',
    icon: 'HeartIcon',
    color: 'bg-red-400'
  },
  {
    id: 'education',
    name: 'Educational Institution Data',
    description: 'Find academic records, student data, and research',
    icon: 'AcademicCapIcon',
    color: 'bg-indigo-600'
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage Exposure',
    description: 'Discover exposed cloud storage buckets and files',
    icon: 'CloudIcon',
    color: 'bg-sky-500'
  },
  {
    id: 'api-keys',
    name: 'API Keys & Tokens',
    description: 'Find exposed API keys, tokens, and credentials',
    icon: 'KeyIcon',
    color: 'bg-yellow-600'
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency & Wallets',
    description: 'Locate crypto wallets, addresses, and transactions',
    icon: 'CurrencyDollarIcon',
    color: 'bg-orange-600'
  },
  {
    id: 'personal-info',
    name: 'Personal Information',
    description: 'Find personal data, PII, and identity information',
    icon: 'IdentificationIcon',
    color: 'bg-purple-600'
  },
  {
    id: 'location-intel',
    name: 'Location Intelligence',
    description: 'Geographic and location-based information gathering',
    icon: 'MapPinIcon',
    color: 'bg-emerald-500'
  },
  {
    id: 'corporate-intel',
    name: 'Corporate Intelligence',
    description: 'Company information, employee data, and business intel',
    icon: 'BuildingOfficeIcon',
    color: 'bg-gray-700'
  },
  {
    id: 'email-intel',
    name: 'Email Intelligence',
    description: 'Email addresses, mailing lists, and communication data',
    icon: 'EnvelopeIcon',
    color: 'bg-blue-400'
  },
  {
    id: 'phone-intel',
    name: 'Phone & Contact Intelligence',
    description: 'Phone numbers, contact lists, and communication data',
    icon: 'PhoneIcon',
    color: 'bg-green-400'
  },
  {
    id: 'network-intel',
    name: 'Network Intelligence',
    description: 'Network infrastructure, IP ranges, and connectivity data',
    icon: 'GlobeAltIcon',
    color: 'bg-indigo-500'
  },
  {
    id: 'document-intel',
    name: 'Document Intelligence',
    description: 'Sensitive documents, reports, and file intelligence',
    icon: 'DocumentTextIcon',
    color: 'bg-slate-500'
  },
  {
    id: 'osint-tools',
    name: 'OSINT & Investigation Tools',
    description: 'Open source intelligence and investigation resources',
    icon: 'MagnifyingGlassIcon',
    color: 'bg-purple-700'
  },
  {
    id: 'advanced-operators',
    name: 'Advanced Search Operators',
    description: 'Complex search patterns and advanced Google operators',
    icon: 'CommandLineIcon',
    color: 'bg-gray-800'
  }
];

export const dorkTemplates: DorkTemplate[] = [
  // Files Containing Passwords
  {
    id: 'pwd-1',
    name: 'Password Files',
    query: 'filetype:txt password OR passwd OR pwd',
    category: 'passwords',
    description: 'Find text files containing password keywords',
    riskLevel: 'high',
    complexity: 'basic',
    tags: ['passwords', 'credentials', 'txt']
  },
  {
    id: 'pwd-2',
    name: 'Database Connection Strings',
    query: 'filetype:config "password=" OR "pwd=" OR "passwd="',
    category: 'passwords',
    description: 'Find config files with database passwords',
    riskLevel: 'critical',
    complexity: 'intermediate',
    tags: ['database', 'config', 'connection']
  },
  {
    id: 'pwd-3',
    name: 'Shadow Files',
    query: 'filetype:txt "$1$" OR "$2$" OR "$5$" OR "$6$"',
    category: 'passwords',
    description: 'Find Unix shadow password files',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['unix', 'shadow', 'hashes']
  },
  {
    id: 'pwd-4',
    name: 'WordPress Config',
    query: 'filetype:txt "DB_PASSWORD" OR "wp-config"',
    category: 'passwords',
    description: 'Find WordPress configuration files with passwords',
    riskLevel: 'high',
    complexity: 'basic',
    tags: ['wordpress', 'cms', 'config']
  },
  {
    id: 'pwd-5',
    name: 'Environment Files with Secrets',
    query: 'filetype:env "PASSWORD" OR "SECRET" OR "KEY"',
    category: 'passwords',
    description: 'Find .env files containing sensitive credentials',
    riskLevel: 'critical',
    complexity: 'intermediate',
    tags: ['env', 'secrets', 'api-keys']
  },
  {
    id: 'pwd-6',
    name: 'FTP Credentials',
    query: 'filetype:txt "ftp://" password OR "ftp_password"',
    category: 'passwords',
    description: 'Find FTP credentials in text files',
    riskLevel: 'high',
    complexity: 'basic',
    tags: ['ftp', 'credentials', 'file-transfer']
  },

  // Sensitive Directories
  {
    id: 'dir-1',
    name: 'Directory Listings',
    query: 'intitle:"Index of" OR intitle:"Directory listing"',
    category: 'directories',
    description: 'Find exposed directory listings',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['directory', 'listing', 'exposed']
  },
  {
    id: 'dir-2',
    name: 'Admin Directories',
    query: 'inurl:admin OR inurl:administrator OR inurl:wp-admin',
    category: 'directories',
    description: 'Find admin panel directories',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['admin', 'panel', 'management']
  },
  {
    id: 'dir-3',
    name: 'Backup Directories',
    query: 'inurl:backup OR inurl:backups OR inurl:bak',
    category: 'directories',
    description: 'Find backup directories',
    riskLevel: 'high',
    complexity: 'basic',
    tags: ['backup', 'archive', 'sensitive']
  },
  {
    id: 'dir-4',
    name: 'Upload Directories',
    query: 'inurl:upload OR inurl:uploads OR inurl:files',
    category: 'directories',
    description: 'Find file upload directories',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['upload', 'files', 'storage']
  },
  {
    id: 'dir-5',
    name: 'Git Repositories',
    query: 'inurl:".git" OR intitle:"Index of /.git"',
    category: 'directories',
    description: 'Find exposed Git repositories',
    riskLevel: 'critical',
    complexity: 'intermediate',
    tags: ['git', 'repository', 'source-code']
  },
  {
    id: 'dir-6',
    name: 'SVN Repositories',
    query: 'inurl:".svn" OR intitle:"Index of /.svn"',
    category: 'directories',
    description: 'Find exposed SVN repositories',
    riskLevel: 'high',
    complexity: 'intermediate',
    tags: ['svn', 'repository', 'version-control']
  },

  // Web Server Detection
  {
    id: 'web-1',
    name: 'Apache Server Info',
    query: 'intitle:"Apache Status" OR "Server Information"',
    category: 'webserver',
    description: 'Find Apache server status pages',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['apache', 'status', 'info']
  },
  {
    id: 'web-2',
    name: 'IIS Server Info',
    query: 'intitle:"IIS" "Microsoft-IIS" OR "Internet Information Services"',
    category: 'webserver',
    description: 'Find IIS server information',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['iis', 'microsoft', 'windows']
  },
  {
    id: 'web-3',
    name: 'Nginx Status',
    query: 'intitle:"nginx status" OR "nginx_status"',
    category: 'webserver',
    description: 'Find Nginx status pages',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['nginx', 'status', 'monitoring']
  },
  {
    id: 'web-4',
    name: 'Server Headers',
    query: 'intext:"Server:" "Apache" OR "nginx" OR "IIS"',
    category: 'webserver',
    description: 'Find pages revealing server headers',
    riskLevel: 'low',
    complexity: 'basic',
    tags: ['headers', 'server', 'version']
  },
  {
    id: 'web-5',
    name: 'Tomcat Manager',
    query: 'intitle:"Apache Tomcat" "Manager App"',
    category: 'webserver',
    description: 'Find Tomcat manager applications',
    riskLevel: 'high',
    complexity: 'intermediate',
    tags: ['tomcat', 'manager', 'java']
  },

  // Vulnerable Files
  {
    id: 'vuln-1',
    name: 'PHP Info Pages',
    query: 'intitle:"phpinfo()" OR "PHP Version"',
    category: 'vulnerable-files',
    description: 'Find PHP info disclosure pages',
    riskLevel: 'high',
    tags: ['php', 'info', 'disclosure']
  },
  {
    id: 'vuln-2',
    name: 'SQL Files',
    query: 'filetype:sql "INSERT INTO" OR "CREATE TABLE"',
    category: 'vulnerable-files',
    description: 'Find SQL dump files',
    riskLevel: 'high',
    tags: ['sql', 'database', 'dump']
  },
  {
    id: 'vuln-3',
    name: 'Log Files',
    query: 'filetype:log "error" OR "warning" OR "failed"',
    category: 'vulnerable-files',
    description: 'Find log files with error information',
    riskLevel: 'medium',
    tags: ['logs', 'errors', 'debug']
  },
  {
    id: 'vuln-4',
    name: 'Backup Files',
    query: 'filetype:bak OR filetype:backup OR filetype:old',
    category: 'vulnerable-files',
    description: 'Find backup and old files',
    riskLevel: 'high',
    tags: ['backup', 'old', 'archive']
  },

  // Error Messages
  {
    id: 'err-1',
    name: 'SQL Errors',
    query: 'intext:"SQL syntax" OR "mysql_fetch" OR "ORA-"',
    category: 'errors',
    description: 'Find pages with SQL error messages',
    riskLevel: 'high',
    tags: ['sql', 'error', 'database']
  },
  {
    id: 'err-2',
    name: 'PHP Errors',
    query: 'intext:"Warning:" "include" OR "require" OR "fopen"',
    category: 'errors',
    description: 'Find PHP error messages',
    riskLevel: 'medium',
    tags: ['php', 'warning', 'include']
  },
  {
    id: 'err-3',
    name: 'ASP.NET Errors',
    query: 'intext:"Server Error" "ASP.NET" OR "System.Exception"',
    category: 'errors',
    description: 'Find ASP.NET error pages',
    riskLevel: 'medium',
    tags: ['asp.net', 'error', 'exception']
  },
  {
    id: 'err-4',
    name: 'Stack Traces',
    query: 'intext:"at java." OR "at org." OR "Exception in thread"',
    category: 'errors',
    description: 'Find Java stack traces',
    riskLevel: 'medium',
    tags: ['java', 'stack', 'trace']
  },

  // Files Containing Juicy Info
  {
    id: 'juicy-1',
    name: 'Email Lists',
    query: 'filetype:txt "@gmail.com" OR "@yahoo.com" OR "@hotmail.com"',
    category: 'juicy-info',
    description: 'Find files containing email addresses',
    riskLevel: 'medium',
    tags: ['email', 'contact', 'list']
  },
  {
    id: 'juicy-2',
    name: 'API Keys',
    query: 'filetype:txt "api_key" OR "apikey" OR "api-key"',
    category: 'juicy-info',
    description: 'Find files containing API keys',
    riskLevel: 'high',
    tags: ['api', 'key', 'credentials']
  },
  {
    id: 'juicy-3',
    name: 'SSH Keys',
    query: 'filetype:txt "BEGIN RSA PRIVATE KEY" OR "ssh-rsa"',
    category: 'juicy-info',
    description: 'Find SSH private keys',
    riskLevel: 'high',
    tags: ['ssh', 'private', 'key']
  },
  {
    id: 'juicy-4',
    name: 'Credit Card Info',
    query: 'filetype:txt "4111" OR "4222" OR "5555" "exp"',
    category: 'juicy-info',
    description: 'Find potential credit card information',
    riskLevel: 'high',
    tags: ['credit', 'card', 'payment']
  },

  // Login Portals
  {
    id: 'login-1',
    name: 'Admin Login Pages',
    query: 'inurl:login "admin" OR "administrator"',
    category: 'login',
    description: 'Find admin login pages',
    riskLevel: 'medium',
    tags: ['login', 'admin', 'portal']
  },
  {
    id: 'login-2',
    name: 'CMS Login Pages',
    query: 'inurl:wp-login OR inurl:admin OR inurl:login.php',
    category: 'login',
    description: 'Find CMS login interfaces',
    riskLevel: 'medium',
    tags: ['cms', 'login', 'wordpress']
  },
  {
    id: 'login-3',
    name: 'Database Admin',
    query: 'intitle:"phpMyAdmin" OR "Adminer" OR "phpPgAdmin"',
    category: 'login',
    description: 'Find database administration interfaces',
    riskLevel: 'high',
    tags: ['database', 'admin', 'phpmyadmin']
  },
  {
    id: 'login-4',
    name: 'Router Login',
    query: 'intitle:"Router" "login" OR "admin" "password"',
    category: 'login',
    description: 'Find router admin interfaces',
    riskLevel: 'medium',
    tags: ['router', 'admin', 'network']
  },

  // Database Files
  {
    id: 'db-1',
    name: 'SQL Database Files',
    query: 'filetype:sql OR filetype:db OR filetype:mdb',
    category: 'databases',
    description: 'Find database files',
    riskLevel: 'high',
    tags: ['database', 'sql', 'mdb']
  },
  {
    id: 'db-2',
    name: 'SQLite Databases',
    query: 'filetype:sqlite OR filetype:sqlite3 OR filetype:db3',
    category: 'databases',
    description: 'Find SQLite database files',
    riskLevel: 'high',
    tags: ['sqlite', 'database', 'mobile']
  },
  {
    id: 'db-3',
    name: 'MongoDB Files',
    query: 'filetype:bson OR "mongodb://" OR "mongo:"',
    category: 'databases',
    description: 'Find MongoDB related files',
    riskLevel: 'high',
    tags: ['mongodb', 'nosql', 'bson']
  },
  {
    id: 'db-4',
    name: 'Database Dumps',
    query: 'filetype:sql "dump" OR "backup" "database"',
    category: 'databases',
    description: 'Find database dump files',
    riskLevel: 'high',
    tags: ['dump', 'backup', 'export']
  },

  // Configuration Files
  {
    id: 'config-1',
    name: 'Web Config Files',
    query: 'filetype:conf OR filetype:config OR filetype:cfg',
    category: 'config',
    description: 'Find configuration files',
    riskLevel: 'medium',
    tags: ['config', 'settings', 'conf']
  },
  {
    id: 'config-2',
    name: 'Environment Files',
    query: 'filetype:env "DB_PASSWORD" OR "API_KEY"',
    category: 'config',
    description: 'Find environment configuration files',
    riskLevel: 'high',
    tags: ['env', 'environment', 'secrets']
  },
  {
    id: 'config-3',
    name: 'Docker Files',
    query: 'filetype:yml "docker" OR "dockerfile" "password"',
    category: 'config',
    description: 'Find Docker configuration files',
    riskLevel: 'medium',
    tags: ['docker', 'container', 'yml']
  },
  {
    id: 'config-4',
    name: 'Apache Config',
    query: 'filetype:conf "apache" OR "httpd.conf" OR ".htaccess"',
    category: 'config',
    description: 'Find Apache configuration files',
    riskLevel: 'medium',
    tags: ['apache', 'httpd', 'htaccess']
  },

  // Network/Vulnerability Data
  {
    id: 'net-1',
    name: 'Network Scans',
    query: 'filetype:txt "nmap" OR "port scan" OR "vulnerability"',
    category: 'network',
    description: 'Find network scan results',
    riskLevel: 'medium',
    tags: ['nmap', 'scan', 'network']
  },
  {
    id: 'net-2',
    name: 'Firewall Rules',
    query: 'filetype:conf "iptables" OR "firewall" OR "rules"',
    category: 'network',
    description: 'Find firewall configuration files',
    riskLevel: 'medium',
    tags: ['firewall', 'iptables', 'security']
  },
  {
    id: 'net-3',
    name: 'VPN Configs',
    query: 'filetype:ovpn OR filetype:conf "vpn" OR "openvpn"',
    category: 'network',
    description: 'Find VPN configuration files',
    riskLevel: 'high',
    tags: ['vpn', 'openvpn', 'tunnel']
  },
  {
    id: 'net-4',
    name: 'Network Diagrams',
    query: 'filetype:pdf "network topology" OR "network diagram"',
    category: 'network',
    description: 'Find network topology documents',
    riskLevel: 'medium',
    tags: ['topology', 'diagram', 'network']
  },

  // Online Devices
  {
    id: 'dev-1',
    name: 'IP Cameras',
    query: 'inurl:"view/index.shtml" OR "ViewerFrame?Mode="',
    category: 'devices',
    description: 'Find IP camera interfaces',
    riskLevel: 'high',
    tags: ['camera', 'surveillance', 'iot']
  },
  {
    id: 'dev-2',
    name: 'Printers',
    query: 'intitle:"HP LaserJet" OR "Canon" OR "Xerox" "status"',
    category: 'devices',
    description: 'Find network printer interfaces',
    riskLevel: 'medium',
    tags: ['printer', 'hp', 'canon']
  },
  {
    id: 'dev-3',
    name: 'IoT Devices',
    query: 'intitle:"Device Status" OR "IoT" "admin"',
    category: 'devices',
    description: 'Find IoT device interfaces',
    riskLevel: 'medium',
    tags: ['iot', 'device', 'smart']
  },
  {
    id: 'dev-4',
    name: 'SCADA Systems',
    query: 'intitle:"SCADA" OR "HMI" OR "Wonderware"',
    category: 'devices',
    description: 'Find SCADA/HMI interfaces',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['scada', 'hmi', 'industrial']
  },

  // Username Intelligence
  {
    id: 'user-1',
    name: 'Username Lists',
    query: 'filetype:txt "username" OR "user:" OR "login:"',
    category: 'usernames',
    description: 'Find files containing username lists',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'username',
    tags: ['username', 'login', 'credentials']
  },
  {
    id: 'user-2',
    name: 'Social Media Profiles by Username',
    query: 'site:linkedin.com OR site:twitter.com OR site:facebook.com "[USERNAME]"',
    category: 'usernames',
    description: 'Find social media profiles for specific username',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'username',
    tags: ['social-media', 'profile', 'osint']
  },
  {
    id: 'user-3',
    name: 'GitHub Profiles by Username',
    query: 'site:github.com "[USERNAME]" OR "@[USERNAME]"',
    category: 'usernames',
    description: 'Find GitHub profiles and repositories for username',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'username',
    tags: ['github', 'code', 'developer']
  },
  {
    id: 'user-4',
    name: 'Forum Posts by Username',
    query: '"posted by [USERNAME]" OR "author: [USERNAME]" OR "by [USERNAME]"',
    category: 'usernames',
    description: 'Find forum posts and comments by username',
    riskLevel: 'low',
    complexity: 'intermediate',
    targetType: 'username',
    tags: ['forum', 'posts', 'comments']
  },
  {
    id: 'user-5',
    name: 'Employee Directory by Username',
    query: '"[USERNAME]" "employee" OR "staff" OR "directory"',
    category: 'usernames',
    description: 'Find employee directories containing username',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'username',
    tags: ['employee', 'directory', 'corporate']
  },

  // Location Intelligence
  {
    id: 'loc-1',
    name: 'Location-based Social Posts',
    query: '"[LOCATION]" site:instagram.com OR site:twitter.com OR site:facebook.com',
    category: 'location-intel',
    description: 'Find social media posts from specific location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['social-media', 'geolocation', 'posts']
  },
  {
    id: 'loc-2',
    name: 'Business Listings by Location',
    query: '"[LOCATION]" "business" OR "company" OR "office" filetype:pdf',
    category: 'location-intel',
    description: 'Find business listings and directories for location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['business', 'directory', 'commercial']
  },
  {
    id: 'loc-3',
    name: 'Government Documents by State',
    query: '"[STATE]" site:gov filetype:pdf OR filetype:doc',
    category: 'location-intel',
    description: 'Find government documents for specific state',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'location',
    tags: ['government', 'state', 'documents']
  },
  {
    id: 'loc-4',
    name: 'Real Estate by Location',
    query: '"[LOCATION]" "real estate" OR "property" OR "for sale"',
    category: 'location-intel',
    description: 'Find real estate listings for specific location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['real-estate', 'property', 'listings']
  },
  {
    id: 'loc-5',
    name: 'News Articles by Location',
    query: '"[LOCATION]" site:news.google.com OR site:cnn.com OR site:bbc.com',
    category: 'location-intel',
    description: 'Find news articles about specific location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['news', 'media', 'current-events']
  },

  // Corporate Intelligence
  {
    id: 'corp-1',
    name: 'Company Employee Lists',
    query: '"[ORGANIZATION]" "employee" OR "staff" filetype:pdf OR filetype:doc',
    category: 'corporate-intel',
    description: 'Find employee lists for specific organization',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'organization',
    tags: ['employees', 'staff', 'corporate']
  },
  {
    id: 'corp-2',
    name: 'Company Financial Reports',
    query: '"[ORGANIZATION]" "annual report" OR "financial" filetype:pdf',
    category: 'corporate-intel',
    description: 'Find financial reports for organization',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'organization',
    tags: ['financial', 'reports', 'annual']
  },
  {
    id: 'corp-3',
    name: 'Company Email Addresses',
    query: '"@[ORGANIZATION].com" OR "@[ORGANIZATION].org"',
    category: 'corporate-intel',
    description: 'Find email addresses for organization domain',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'organization',
    tags: ['email', 'domain', 'contacts']
  },
  {
    id: 'corp-4',
    name: 'Company Presentations',
    query: '"[ORGANIZATION]" filetype:ppt OR filetype:pptx "confidential"',
    category: 'corporate-intel',
    description: 'Find company presentations and slides',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'organization',
    tags: ['presentations', 'slides', 'internal']
  },
  {
    id: 'corp-5',
    name: 'Company Job Postings',
    query: '"[ORGANIZATION]" "job" OR "career" OR "hiring"',
    category: 'corporate-intel',
    description: 'Find job postings and career information',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'organization',
    tags: ['jobs', 'careers', 'hiring']
  },

  // Email Intelligence
  {
    id: 'email-1',
    name: 'Email Lists by Domain',
    query: 'filetype:txt "@[DOMAIN]" OR "email" "[DOMAIN]"',
    category: 'email-intel',
    description: 'Find email lists for specific domain',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'email',
    tags: ['email', 'domain', 'lists']
  },
  {
    id: 'email-2',
    name: 'Mailing List Archives',
    query: '"mailing list" "[EMAIL]" OR "subscribe" "[EMAIL]"',
    category: 'email-intel',
    description: 'Find mailing list archives containing email',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'email',
    tags: ['mailing-list', 'archives', 'subscription']
  },
  {
    id: 'email-3',
    name: 'Email in Documents',
    query: 'filetype:pdf OR filetype:doc "[EMAIL]"',
    category: 'email-intel',
    description: 'Find documents containing specific email address',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'email',
    tags: ['documents', 'pdf', 'contact']
  },
  {
    id: 'email-4',
    name: 'Email Breach Data',
    query: '"[EMAIL]" "password" OR "breach" OR "leak"',
    category: 'email-intel',
    description: 'Find potential breach data containing email',
    riskLevel: 'high',
    complexity: 'advanced',
    targetType: 'email',
    tags: ['breach', 'leak', 'security']
  },

  // Phone Intelligence
  {
    id: 'phone-1',
    name: 'Phone Number Lookup',
    query: '"[PHONE]" "name" OR "address" OR "owner"',
    category: 'phone-intel',
    description: 'Find information associated with phone number',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'phone',
    tags: ['phone', 'lookup', 'owner']
  },
  {
    id: 'phone-2',
    name: 'Business Phone Numbers',
    query: '"[PHONE]" "business" OR "company" OR "office"',
    category: 'phone-intel',
    description: 'Find business information for phone number',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'phone',
    tags: ['business', 'office', 'commercial']
  },
  {
    id: 'phone-3',
    name: 'Phone in Social Media',
    query: '"[PHONE]" site:facebook.com OR site:linkedin.com',
    category: 'phone-intel',
    description: 'Find social media profiles with phone number',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'phone',
    tags: ['social-media', 'profile', 'contact']
  },

  // Social Media Intelligence
  {
    id: 'social-1',
    name: 'Instagram Posts by Location',
    query: 'site:instagram.com "[LOCATION]" OR "#[LOCATION]"',
    category: 'social-media',
    description: 'Find Instagram posts from specific location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['instagram', 'geolocation', 'hashtags']
  },
  {
    id: 'social-2',
    name: 'Twitter Profiles by Username',
    query: 'site:twitter.com "[USERNAME]" OR "@[USERNAME]"',
    category: 'social-media',
    description: 'Find Twitter profiles and mentions',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'username',
    tags: ['twitter', 'profile', 'mentions']
  },
  {
    id: 'social-3',
    name: 'LinkedIn Company Employees',
    query: 'site:linkedin.com "[ORGANIZATION]" "employee" OR "works at"',
    category: 'social-media',
    description: 'Find LinkedIn profiles of company employees',
    riskLevel: 'medium',
    complexity: 'intermediate',
    targetType: 'organization',
    tags: ['linkedin', 'employees', 'professional']
  },
  {
    id: 'social-4',
    name: 'Facebook Pages by Location',
    query: 'site:facebook.com "[LOCATION]" "page" OR "business"',
    category: 'social-media',
    description: 'Find Facebook business pages by location',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'location',
    tags: ['facebook', 'business', 'local']
  },
  {
    id: 'social-5',
    name: 'YouTube Channels by Username',
    query: 'site:youtube.com "[USERNAME]" OR "channel" "[USERNAME]"',
    category: 'social-media',
    description: 'Find YouTube channels for username',
    riskLevel: 'low',
    complexity: 'basic',
    targetType: 'username',
    tags: ['youtube', 'channel', 'video']
  },

  // Government & Military Files
  {
    id: 'gov-1',
    name: 'Government Employee Lists',
    query: 'site:gov "employee" OR "staff" filetype:pdf',
    category: 'government',
    description: 'Find government employee directories',
    riskLevel: 'medium',
    complexity: 'intermediate',
    tags: ['government', 'employees', 'public']
  },
  {
    id: 'gov-2',
    name: 'Military Documents',
    query: 'site:mil filetype:pdf "classified" OR "confidential"',
    category: 'government',
    description: 'Find military documents and reports',
    riskLevel: 'high',
    complexity: 'advanced',
    tags: ['military', 'classified', 'documents']
  },
  {
    id: 'gov-3',
    name: 'Government Contracts',
    query: 'site:gov "contract" OR "procurement" filetype:pdf',
    category: 'government',
    description: 'Find government contracts and procurement',
    riskLevel: 'medium',
    complexity: 'intermediate',
    tags: ['contracts', 'procurement', 'public']
  },
  {
    id: 'gov-4',
    name: 'State Government Documents',
    query: '"[STATE]" site:gov filetype:pdf OR filetype:doc',
    category: 'government',
    description: 'Find state government documents',
    riskLevel: 'medium',
    complexity: 'basic',
    targetType: 'location',
    tags: ['state', 'government', 'documents']
  },

  // Financial Information
  {
    id: 'fin-1',
    name: 'Financial Reports',
    query: '"annual report" OR "financial statement" filetype:pdf',
    category: 'financial',
    description: 'Find company financial reports',
    riskLevel: 'low',
    complexity: 'basic',
    tags: ['financial', 'reports', 'annual']
  },
  {
    id: 'fin-2',
    name: 'Bank Documents',
    query: '"bank statement" OR "account number" filetype:pdf',
    category: 'financial',
    description: 'Find bank statements and financial documents',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['bank', 'statements', 'accounts']
  },
  {
    id: 'fin-3',
    name: 'Investment Documents',
    query: '"investment" OR "portfolio" OR "securities" filetype:pdf',
    category: 'financial',
    description: 'Find investment and portfolio documents',
    riskLevel: 'medium',
    complexity: 'intermediate',
    tags: ['investment', 'portfolio', 'securities']
  },

  // Medical Records
  {
    id: 'med-1',
    name: 'Medical Records',
    query: '"patient" OR "medical record" filetype:pdf OR filetype:doc',
    category: 'medical',
    description: 'Find medical records and patient information',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['medical', 'patient', 'hipaa']
  },
  {
    id: 'med-2',
    name: 'Hospital Documents',
    query: '"hospital" OR "clinic" "patient" filetype:pdf',
    category: 'medical',
    description: 'Find hospital and clinic documents',
    riskLevel: 'high',
    complexity: 'intermediate',
    tags: ['hospital', 'clinic', 'healthcare']
  },

  // Educational Institution Data
  {
    id: 'edu-1',
    name: 'Student Records',
    query: 'site:edu "student" OR "grade" filetype:pdf OR filetype:xls',
    category: 'education',
    description: 'Find student records and academic data',
    riskLevel: 'high',
    complexity: 'intermediate',
    tags: ['student', 'academic', 'records']
  },
  {
    id: 'edu-2',
    name: 'University Research',
    query: 'site:edu "research" OR "thesis" filetype:pdf',
    category: 'education',
    description: 'Find university research and thesis documents',
    riskLevel: 'low',
    complexity: 'basic',
    tags: ['research', 'thesis', 'academic']
  },

  // Cloud Storage Exposure
  {
    id: 'cloud-1',
    name: 'AWS S3 Buckets',
    query: 'site:s3.amazonaws.com OR "s3 bucket" "Index of"',
    category: 'cloud-storage',
    description: 'Find exposed AWS S3 buckets',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['aws', 's3', 'bucket']
  },
  {
    id: 'cloud-2',
    name: 'Google Drive Files',
    query: 'site:drive.google.com "shared" OR "public"',
    category: 'cloud-storage',
    description: 'Find publicly shared Google Drive files',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['google-drive', 'shared', 'public']
  },
  {
    id: 'cloud-3',
    name: 'Dropbox Shares',
    query: 'site:dropbox.com "shared" OR "public"',
    category: 'cloud-storage',
    description: 'Find public Dropbox shares',
    riskLevel: 'medium',
    complexity: 'basic',
    tags: ['dropbox', 'shared', 'public']
  },

  // API Keys & Tokens
  {
    id: 'api-1',
    name: 'API Keys in Code',
    query: 'filetype:js OR filetype:json "api_key" OR "apikey"',
    category: 'api-keys',
    description: 'Find API keys in JavaScript and JSON files',
    riskLevel: 'critical',
    complexity: 'intermediate',
    tags: ['api-key', 'javascript', 'json']
  },
  {
    id: 'api-2',
    name: 'GitHub API Keys',
    query: 'site:github.com "api_key" OR "secret_key" OR "access_token"',
    category: 'api-keys',
    description: 'Find exposed API keys on GitHub',
    riskLevel: 'critical',
    complexity: 'advanced',
    tags: ['github', 'api-key', 'token']
  },
  {
    id: 'api-3',
    name: 'AWS Access Keys',
    query: '"AKIA" OR "aws_access_key_id" OR "aws_secret_access_key"',
    category: 'api-keys',
    description: 'Find AWS access keys and credentials',
    riskLevel: 'critical',
    complexity: 'expert',
    tags: ['aws', 'access-key', 'credentials']
  },

  // Cryptocurrency
  {
    id: 'crypto-1',
    name: 'Bitcoin Addresses',
    query: '"1" OR "3" OR "bc1" "bitcoin" "address"',
    category: 'cryptocurrency',
    description: 'Find Bitcoin wallet addresses',
    riskLevel: 'medium',
    complexity: 'intermediate',
    tags: ['bitcoin', 'wallet', 'address']
  },
  {
    id: 'crypto-2',
    name: 'Ethereum Addresses',
    query: '"0x" "ethereum" "address" OR "wallet"',
    category: 'cryptocurrency',
    description: 'Find Ethereum wallet addresses',
    riskLevel: 'medium',
    complexity: 'intermediate',
    tags: ['ethereum', 'wallet', 'address']
  },

  // Personal Information
  {
    id: 'personal-1',
    name: 'Social Security Numbers',
    query: 'filetype:pdf "SSN" OR "social security"',
    category: 'personal-info',
    description: 'Find documents containing SSN references',
    riskLevel: 'critical',
    complexity: 'expert',
    tags: ['ssn', 'social-security', 'pii']
  },
  {
    id: 'personal-2',
    name: 'Driver License Info',
    query: '"driver license" OR "DL number" filetype:pdf',
    category: 'personal-info',
    description: 'Find driver license information',
    riskLevel: 'high',
    complexity: 'advanced',
    tags: ['driver-license', 'identification', 'pii']
  },

  // Advanced Search Operators
  {
    id: 'adv-1',
    name: 'Wildcard Username Search',
    query: '"user*" OR "admin*" OR "test*"',
    category: 'advanced-operators',
    description: 'Use wildcards to find username patterns',
    riskLevel: 'medium',
    complexity: 'expert',
    tags: ['wildcard', 'pattern', 'username']
  },
  {
    id: 'adv-2',
    name: 'Date Range Search',
    query: 'after:2020-01-01 before:2023-12-31 "[KEYWORD]"',
    category: 'advanced-operators',
    description: 'Search within specific date ranges',
    riskLevel: 'low',
    complexity: 'expert',
    tags: ['date-range', 'temporal', 'advanced']
  },
  {
    id: 'adv-3',
    name: 'Numeric Range Search',
    query: '"[KEYWORD]" 100..1000',
    category: 'advanced-operators',
    description: 'Search for numeric ranges',
    riskLevel: 'low',
    complexity: 'expert',
    tags: ['numeric', 'range', 'advanced']
  },

  // OSINT Tools
  {
    id: 'osint-1',
    name: 'Cached Pages',
    query: 'cache:[URL]',
    category: 'osint-tools',
    description: 'View cached versions of pages',
    riskLevel: 'low',
    complexity: 'intermediate',
    tags: ['cache', 'archive', 'historical']
  },
  {
    id: 'osint-2',
    name: 'Related Sites',
    query: 'related:[DOMAIN]',
    category: 'osint-tools',
    description: 'Find sites related to a domain',
    riskLevel: 'low',
    complexity: 'basic',
    tags: ['related', 'similar', 'domain']
  },
  {
    id: 'osint-3',
    name: 'Link Analysis',
    query: 'link:[DOMAIN]',
    category: 'osint-tools',
    description: 'Find pages linking to a domain',
    riskLevel: 'low',
    complexity: 'intermediate',
    tags: ['backlinks', 'references', 'seo']
  }
];

export const getTemplatesByCategory = (categoryId: string): DorkTemplate[] => {
  return dorkTemplates.filter(template => template.category === categoryId);
};

export const searchTemplates = (query: string): DorkTemplate[] => {
  const searchTerm = query.toLowerCase();
  return dorkTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm) ||
    template.description.toLowerCase().includes(searchTerm) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};