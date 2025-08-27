import React, { useState, useEffect, useRef } from 'react';
import { PROFILE_DATA } from '../constants';
import ThemeSwitcher from './ThemeSwitcher';

type OutputLine = {
  type: 'command' | 'response' | 'error';
  content: React.ReactNode;
};

interface Command {
  description: string;
  usage?: string;
  args?: readonly string[];
}

interface TerminalProps {
  onExit: () => void;
}

const sections = ['about', 'experience', 'skills', 'projects', 'education', 'certificates', 'languages'] as const;

const commands: Record<string, Command> = {
  'help': { description: 'Mostra os comandos disponíveis.' },
  'whoami': { description: 'Exibe um resumo do perfil.' },
  'ls': { description: 'Mostra uma descrição sobre este projeto.' },
  'scan': { description: 'Lista todas as seções disponíveis para visualização.' },
  'search': {
    description: 'Busca por palavras-chave nos projetos.',
    usage: 'search [palavra-chave]',
  },
  'show': { 
    description: 'Exibe os detalhes de uma seção específica.',
    usage: 'show [seção]',
    args: sections
  },
  'social': { description: 'Exibe links para redes e contatos.' },
  'contact': { description: 'Exibe informações de contato.' },
  'resume': { description: 'Fornece um link para baixar o currículo.' },
  'clear': { description: 'Limpa a tela do terminal.' },
  'init': { description: 'Retorna para a tela inicial.' },
};

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Welcome message
    setHistory([{ type: 'response', content: "Bem-vindo ao Profile Terminal. Digite 'help' para ver a lista de comandos." }]);
  }, []);
  
  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (command: string) => {
    const [cmd, ...args] = command.trim().toLowerCase().split(' ');
    const newHistory: OutputLine[] = [...history, { type: 'command', content: command }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'response', content: (
          <div>
            <p>Comandos disponíveis:</p>
            <ul className="list-inside list-disc mt-2">
              {Object.entries(commands).map(([key, cmdDef]) => {
                const displayKey = cmdDef.usage || key;
                return (<li key={key}><span className="text-[var(--color-text-default)]">{displayKey}</span> - {cmdDef.description}</li>)
              })}
            </ul>
          </div>
        )});
        break;
      case 'whoami':
        newHistory.push({ type: 'response', content: (
          <div className="flex items-center gap-4">
            {PROFILE_DATA.imageUrl && <img src={PROFILE_DATA.imageUrl} alt="Foto do Perfil" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2  flex-shrink-0" />}
            <div>
                <p className="font-bold text-lg">{PROFILE_DATA.name}</p>
                <p>{PROFILE_DATA.title}</p>
            </div>
          </div>
        )});
        break;
      case 'ls':
        newHistory.push({ type: 'response', content: (
          <div>
            <p className="font-bold text-[var(--color-text-default)] mb-2">Sobre o Kleiton-OS Terminal:</p>
            <p>
              Este é um portfólio interativo no estilo de um terminal de linha de comando para apresentar o perfil de Kleiton Souza.
              Inspirado em interfaces de sistemas operacionais, foi construído com React, TypeScript e Tailwind CSS para criar uma experiência de usuário única.
            </p>
          </div>
        )});
        break;
      case 'scan':
        newHistory.push({ type: 'response', content: (
          <div>
            <p>Seções encontradas. Use 'show [seção]' para ver os detalhes:</p>
            <ul className="list-inside list-disc mt-2 grid grid-cols-2 gap-x-4">
              {sections.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        )});
        break;
      case 'show':
        const section = args[0];
        if (!section || !(sections as readonly string[]).includes(section)) {
          newHistory.push({ type: 'error', content: `Erro: Seção '${section || ''}' não encontrada. Use 'scan' para ver as opções.`});
        } else {
          // Add rendering for each section here
          let content: React.ReactNode;
          switch(section) {
            case 'about': content = PROFILE_DATA.about.map((line, i) => <p key={i} className="mb-2 last:mb-0">{line}</p>); break;
            case 'experience': content = PROFILE_DATA.experience.map((e,i) => <div key={i} className="mb-4">
              <p className="font-bold text-[var(--color-text-default)]">{e.role} @ {e.company} ({e.period})</p>
              <ul className="list-disc list-inside ml-4">{e.description.map((d, j) => <li key={j}>{d}</li>)}</ul>
            </div>); break;
            case 'skills':
              content = PROFILE_DATA.skills.map((s, i) => (
                <div key={s.category} className="mb-4 last:mb-0">
                  <p className="font-bold text-[var(--color-text-secondary)] underline">{s.category}</p>
                  <ul className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 pl-4">
                    {s.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ));
              break;
            case 'projects':
              content = PROFILE_DATA.projects.map((p, i) => (
                <div key={i} className="mb-6 last:mb-0 flex flex-col sm:flex-row items-start gap-4">
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail}
                      alt={`${p.name} thumbnail`}
                      className="w-full sm:w-40 h-auto object-cover border-2 border-[var(--color-border)] flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-bold text-[var(--color-text-default)]">{p.name} ({p.date})</p>
                    <p className="mt-1">{p.description}</p>
                    <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4">
                      {p.technologies && p.technologies.length > 0 && (
                        <>
                          <span className="text-[var(--color-text-secondary)] font-bold">Stack:</span>
                          <span>{p.technologies.join(', ')}</span>
                        </>
                      )}
                      {p.team && p.team.length > 0 && (
                        <>
                          <span className="text-[var(--color-text-secondary)] font-bold">Team:</span>
                          <span>{p.team.join(', ')}</span>
                        </>
                      )}
                      {p.url && (
                        <>
                          <span className="text-[var(--color-text-secondary)] font-bold">Link:</span>
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline truncate">
                            {p.url}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ));
              break;
            case 'education': content = PROFILE_DATA.education.map((e,i) => <p key={i}>{e.degree} - {e.institution} ({e.period})</p>); break;
            case 'certificates': content = PROFILE_DATA.certificates.map((c,i) => <p key={i}>{c.name} - {c.issuer} ({c.date})</p>); break;
            case 'languages': content = PROFILE_DATA.languages.map((l,i) => <p key={i}>{l.name}: {l.level}</p>); break;
            default: content = "Seção em construção.";
          }
           newHistory.push({ type: 'response', content: <div><h3 className="text-lg text-[var(--color-text-default)] font-bold mb-2 capitalize border-b border-[var(--color-border)]">-- {section} --</h3>{content}</div>});
        }
        break;
      case 'search':
        const keyword = args.join(' ').toLowerCase();
        if (!keyword) {
          newHistory.push({ type: 'error', content: "Erro: Forneça uma palavra-chave para buscar. Uso: search [palavra-chave]" });
          break;
        }

        const matchingProjects = PROFILE_DATA.projects.filter(p => 
          p.description.toLowerCase().includes(keyword) ||
          p.technologies?.some(t => t.toLowerCase().includes(keyword))
        );

        if (matchingProjects.length === 0) {
          newHistory.push({ type: 'response', content: `Nenhum projeto encontrado com a palavra-chave: '${args.join(' ')}'` });
        } else {
          const content = matchingProjects.map((p, i) => (
            <div key={i} className="mb-6 last:mb-0 flex flex-col sm:flex-row items-start gap-4">
              {p.thumbnail && (
                <img
                  src={p.thumbnail}
                  alt={`${p.name} thumbnail`}
                  className="w-full sm:w-40 h-auto object-cover border-2 border-[var(--color-border)] flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <p className="font-bold text-[var(--color-text-default)]">{p.name} ({p.date})</p>
                <p className="mt-1">{p.description}</p>
                <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4">
                  {p.technologies && p.technologies.length > 0 && (
                    <>
                      <span className="text-[var(--color-text-secondary)] font-bold">Stack:</span>
                      <span>{p.technologies.join(', ')}</span>
                    </>
                  )}
                  {p.team && p.team.length > 0 && (
                    <>
                      <span className="text-[var(--color-text-secondary)] font-bold">Team:</span>
                      <span>{p.team.join(', ')}</span>
                    </>
                  )}
                  {p.url && (
                    <>
                      <span className="text-[var(--color-text-secondary)] font-bold">Link:</span>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline truncate">
                        {p.url}
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ));
          newHistory.push({ type: 'response', content: <div><h3 className="text-lg text-[var(--color-text-default)] font-bold mb-2 capitalize border-b border-[var(--color-border)]">-- Resultados da Busca para '{args.join(' ')}' --</h3>{content}</div>});
        }
        break;
      case 'social':
        newHistory.push({
          type: 'response',
          content: (
            <div>
              <h3 className="text-lg text-[var(--color-text-default)] font-bold mb-2 capitalize border-b border-[var(--color-border)]">-- Social & Links --</h3>
              {PROFILE_DATA.links.map((l) => (
                <p key={l.name} className="flex items-center">
                  <span className="font-bold w-20 sm:w-24 flex-shrink-0">{l.name}:</span>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline truncate">
                    {l.url}
                  </a>
                </p>
              ))}
            </div>
          ),
        });
        break;
      case 'contact':
        const { contact } = PROFILE_DATA;
        newHistory.push({
          type: 'response',
          content: (
            <div>
              <h3 className="text-lg text-[var(--color-text-default)] font-bold mb-2 capitalize border-b border-[var(--color-border)]">-- Contato --</h3>
              <p className="flex items-center">
                <span className="font-bold w-20 sm:w-24 flex-shrink-0">Email:</span>
                <a href={`mailto:${contact.email}`} className="text-[var(--color-text-default)] underline truncate">
                  {contact.email}
                </a>
              </p>
              {contact.linkedin && (
                <p className="flex items-center">
                  <span className="font-bold w-20 sm:w-24 flex-shrink-0">LinkedIn:</span>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline truncate">
                    {contact.linkedin}
                  </a>
                </p>
              )}
              {contact.github && (
                <p className="flex items-center">
                  <span className="font-bold w-20 sm:w-24 flex-shrink-0">GitHub:</span>
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline truncate">
                    {contact.github}
                  </a>
                </p>
              )}
              {contact.telefone && (
                <p className="flex items-center">
                  <span className="font-bold w-20 sm:w-24 flex-shrink-0">Telefone:</span>
                  <a href={`tel:${contact.telefone.replace(/\s/g, '')}`} className="text-[var(--color-text-default)] underline">
                    {contact.telefone}
                  </a>
                </p>
              )}
            </div>
          ),
        });
        break;
      case 'resume':
        newHistory.push({
          type: 'response',
          content: (
            <div>
              <p>Você pode baixar o currículo aqui:</p>
              <a href={PROFILE_DATA.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-default)] underline mt-2 inline-block">
                Download Currículo (PDF)
              </a>
            </div>
          ),
        });
        break;
      case 'init':
        onExit();
        return;
      case 'clear':
        setHistory([]);
        return;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', content: `Comando não reconhecido: '${cmd}'. Digite 'help' para ver a lista de comandos.` });
    }
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput) {
      const newCommandHistory = [...commandHistory, trimmedInput];
      setCommandHistory(newCommandHistory);
      setHistoryIndex(newCommandHistory.length);
    }
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Tab': {
        e.preventDefault();
        const parts = input.trim().split(/\s+/);
        const currentInput = parts[parts.length - 1].toLowerCase();

        if (parts.length === 1) {
          const commandKeys = Object.keys(commands);
          const potentialCommands = commandKeys.filter(c => c.startsWith(currentInput));
          if (potentialCommands.length === 1) {
            setInput(potentialCommands[0] + ' ');
          }
        } else if (parts.length === 2) {
          const commandName = parts[0].toLowerCase();
          const commandDef = commands[commandName];
          if (commandDef?.args) {
            const potentialArgs = commandDef.args.filter(arg => arg.startsWith(currentInput));
            if (potentialArgs.length === 1) {
              setInput(`${commandName} ${potentialArgs[0]} `);
            }
          }
        }
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = Math.min(commandHistory.length, historyIndex + 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] || '');
        }
        break;
      }
      default:
        break;
    }
  };


  return (
    <div className="w-full h-full p-2 sm:p-4 font-mono text-sm md:text-base" onClick={() => inputRef.current?.focus()}>
      <ThemeSwitcher />
      <div className="overflow-y-auto h-full pb-10">
        {history.map((line, index) => (
          <div key={index} className="mb-2">
            {line.type === 'command' && (
              <div className="flex flex-wrap">
                <span className="text-[var(--color-text-secondary)] mr-2">kleiton@dev:~$</span>
                <span className="text-[var(--color-text-default)] break-all">{line.content}</span>
              </div>
            )}
            {line.type === 'response' && <div>{line.content}</div>}
            {line.type === 'error' && <div className="text-[var(--color-text-error)]">{line.content}</div>}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex flex-wrap items-center mt-2">
          <label htmlFor="terminal-input" className="text-[var(--color-text-secondary)] mr-2">kleiton@dev:~$</label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input flex-1 min-w-[50px] bg-transparent text-[var(--color-text-default)] border-none focus:ring-0"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={endOfHistoryRef} />
      </div>
    </div>
  );
};

export default Terminal;