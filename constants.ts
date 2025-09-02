import { ProfileData } from './types';

// --- DADOS DO PERFIL EXTRAÍDOS ---
export const PROFILE_DATA: ProfileData = {
  name: 'Kleiton Souza',
  title: 'Desenvolvedor Fullstack | Laravel & React.js | Criando Soluções Escaláveis com Foco em Performance e Resultados',
  imageUrl: '/profile-terminal/FotoPerfilHome.png',
  about: [
    '🚀 Desenvolvedor Fullstack com mais de 4 anos de experiência especializado na construção e otimização de aplicações web robustas e escaláveis.',
    'Movido pela paixão em transformar desafios complexos em soluções técnicas elegantes e eficientes que impulsionam o sucesso dos negócios.',
    'Minha expertise é concentrada no ecossistema PHP (Laravel, Zend Framework) para o backend e JavaScript (React.js, Node.js, TypeScript) para o frontend e aplicações fullstack.',
    'Possuo sólida experiência em integração de APIs RESTful, gestão de bancos de dados relacionais (MySQL, PostgreSQL) e implementação de práticas modernas de desenvolvimento.'
  ],
  contact: {
    email: 'kleiton.ads@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/kleitonsouzaads/',
    github: 'https://github.com/kleitonADS/',
    telefone: '61 993112205'
  },

  resumeUrl: './Kleiton-Souza-Curriculo.pdf',
  experience: [
    {
      role: 'Desenvolvedor Fullstack PHP / Laravel / Python / ReactJS',
      company: 'Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome',
      period: 'jun. 2024 - presente',
      description: [
        'Desenvolvimento e manutenção de aplicações web críticas em PHP (Laravel) e React.js, seguindo princípios de código limpo e arquitetura escalável, garantindo alta performance e segurança para milhões de usuários',
        'Liderança técnica na integração de APIs de serviços governamentais, automatizando processos manuais e melhorando a eficiência do fluxo de dados.',
        'Otimização de queries e estrutura de banco de dados PostgreSQL, resultando em um aumento de 30% na eficiência do sistema durante picos de acesso.'
      ]
    },
    {
      role: 'Desenvolvedor BackEnd PHP / Laravel',
      company: 'Leadtax',
      period: 'dez. 2023 - jun. 2024',
      description: [
        'Desenvolvimento de motores de cálculo de impostos e soluções fiscais automatizadas utilizando PHP Laravel, integradas diretamente com ERPs como SAP',
        'Criação e implementação de Robotic Process Automation (RPA) para apuração e transmissão de obrigações acessórias, reduzindo o tempo de processamento em mais de 50% e minimizando erros manuais.',
        'Atuação direta no projeto de automação completa do inbound (Miro x Migo), entregando uma solução de ponta a ponta que simplificou operações complexas.'
      ]
    },
     {
      role: 'Programador PHP',
      company: 'Cast Informática (Ministério da Agricultura)',
      period: 'set. 2013 - jun. 2015',
      description: [
        'Desenvolvimento e manutenção de sistemas para o Ministério da Agricultura utilizando Zend Framework, PHP, JavaScript e PostgreSQL.',
        'Atuação significativa no projeto "Mais Alimentos", implementando novas funcionalidades e garantindo a estabilidade do sistema legado',
        'Colaboração com a equipe para refatorar e melhorar a base de código legada, aumentando a confiabilidade e a manutenibilidade do sistema.'
      ]
    },
    {
      role: 'Web Developer',
      company: 'Agency - Freedom of Expression',
      period: 'jan. 2013 - ago. 2013',
      description: [
        'Edição e criação de websites utilizando HTML, CSS, JavaScript, jQuery e WordPress.'
      ]
    }
  ],
  skills: [
    { category: 'Backend', items: ['PHP', 'Laravel', 'Python', 'NodeJS', 'ExpressJS', 'Zend', 'Prado', 'CodeIgniter'] },
    { category: 'Frontend', items: ['ReactJS', 'JavaScript', 'HTML5', 'CSS3', 'JQuery', 'Bootstrap', 'NextJs', 'Tailwind'] },
    { category: 'Banco de Dados', items: ['MySQL', 'PostgreSQL', 'SQL Server', 'DB2', 'Oracle'] },
  ],
  education: [
    {
      degree: 'Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade Católica de Brasília',
      period: '2010 - 2013'
    }
  ],
  certificates: [
    { name: 'Curso Online de PHP', issuer: 'Rocketseat', date: 'out. 2024' },
    { name: 'NLW Pocket: Javascript - Full-stack', issuer: 'Rocketseat', date: 'set. 2024' },
    { name: 'Scrum Fundamentals Certified (SFC)', issuer: 'SCRUMstudy', date: 'abr. 2015' }
  ],
  projects: [
    {
      name: 'Mais Alimemtos',
      date: 'jun. 2014',
      description: 'Evolução de sistema para o Ministério do Desenvolvimento Agrário utilizando PHP, ZendFramework, HTML5, Bootstrap, e PostgreSQL.',
      team: ['Ederson Ferreira', 'Pedro H. Alarcão', 'Glédson Sousa', 'Paulo Cesar Goncalves'],
      technologies: ['PHP', 'ZendFramework', 'HTML5', 'Bootstrap', 'PostgreSQL'],
      thumbnail: './maisAlimentos.png'
    }

  ],
  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Avançado (Intercâmbio no Canadá)' }
  ],
  links: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kleitonsouzaads/' },
    { name: 'GitHub', url: 'https://github.com/kleitonADS' },
    { name: 'Site Pessoal', url: 'https://kleitonads.github.io/MyProfile2017/' }
  ]
};