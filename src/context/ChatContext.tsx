import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, PathType } from '../types/chat';

// Define the shape of our context
interface ChatContextType {
  sessions: ChatSession[];
  currentSessionId: string | null;
  createNewSession: () => void;
  switchSession: (sessionId: string) => void;
  sendMessage: (content: string) => void;
  selectPath: (path: PathType) => void;
  currentSession: ChatSession | null;
  cycleRepeat: number;
  isTyping: boolean;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  startCycleCheck: () => void;
  isCycleActive: boolean;
  isFeelingChecked: boolean;
  isGoalChecked: boolean;
  handleCycleResponse: (isStillFeeling: boolean) => void;
  cycleStep: 'primary' | 'secondary' | null;
  feelingAnswers: {
    feeling_answer1: string;
    feeling_answer2: string;
    feeling_answer3: string;
    feeling_answer4: string;
  };
  goalAnswers: {
    goal_answer1: string;
    goal_answer2: string;
    goal_answer3: string;
    goal_answer4: string;
    goal_answer5: string;
  };
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create a provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const [cycleStep, setCycleStep] = useState<'primary' | 'secondary' | null>(null);
  const [cycleRepeat, setCycleRepeat] = useState<number>(0);
  // Add state variables for feeling and goal answers
  const [feelingAnswers, setFeelingAnswers] = useState({
    feeling_answer1: '',
    feeling_answer2: '',
    feeling_answer3: '',
    feeling_answer4: ''
  });
  
  const [isFeelingChecked, setIsFeelingChecked] = useState(false);
  const [isGoalChecked, setIsGoalChecked] = useState(false);

  const [goalAnswers, setGoalAnswers] = useState({
    goal_answer1: '',
    goal_answer2: '',
    goal_answer3: '',
    goal_answer4: '',
    goal_answer5: ''
  });

  // Initialize a session on first load
  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get the current session
  const currentSession = currentSessionId 
    ? sessions.find(session => session.id === currentSessionId) || null 
    : null;

  // Create a new chat session
  const createNewSession = () => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: `Chat ${sessions.length + 1}`,
      messages: [{
        id: Date.now().toString(),
        role: 'bot',
        content: 'How do you want to start today?\n Click one of the following options',
        timestamp: new Date(),
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      currentStep: 0,
    };
    setCycleRepeat(0);
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSessionId);
    setIsCycleActive(false);
    setCycleStep(null);
    setIsFeelingChecked(false);
    setIsGoalChecked(false);
  };

  // Switch to a different session
  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsMobileSidebarOpen(false);
    setIsCycleActive(false);
    setCycleStep(null);
  };

  // Get user's first and second answers for cycle questioning


  // Start the cycle check process
  const startCycleCheck = () => {
    if (!currentSession) return;
    
    
    
    setIsTyping(true);
    setCycleStep('secondary');
    setIsCycleActive(true);
    
    setTimeout(() => {
      const botMessageId = Date.now().toString();
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              {
                id: botMessageId,
                role: 'bot',
                content: `Do you still feel ${feelingAnswers.feeling_answer2}?`,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      setIsTyping(false);
    }, 300);
  };

  // Handle user's response to a cycle question
  const handleCycleResponse = (isStillFeeling: boolean) => {
    if (!currentSession) return;
    setIsTyping(true);
    setCycleRepeat(cycleRepeat + 1);
    setTimeout(() => {
      const botMessageId = Date.now().toString();
      
      // If they still have the secondary feeling, ask the same question again
      if (cycleStep === 'secondary' && isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Do you still feel ${feelingAnswers.feeling_answer2}?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
              currentStep: session.path === 'feeling' ? 2 : 3,
            };
          }
          return session;
        }));
        setIsTyping(false);
      } 
      // If they no longer have the secondary feeling, ask about primary feeling
      else if (cycleStep === 'secondary' && !isStillFeeling) {
        setCycleStep('primary');
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Do you still feel ${feelingAnswers.feeling_answer1}?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
              currentStep: session.path === 'feeling' ? 2 : 3,
            };
          }
          return session;
        }));
        setIsTyping(false);
      }
      // If they still have the primary feeling, go back to asking what it feels like
      else if (cycleStep === 'primary' && isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `Feel ${feelingAnswers.feeling_answer1} — what does ${feelingAnswers.feeling_answer1} feel like?`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
              currentStep: session.path === 'feeling' ? 2 : 3,
            };
          }
          return session;
        }));
        setCycleStep(null);
        setIsCycleActive(false);
        setIsTyping(false);
      }
      // If they no longer have the primary feeling, ask how they're feeling now
      else if (cycleStep === 'primary' && !isStillFeeling) {
        setSessions(prev => prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [
                ...session.messages,
                {
                  id: botMessageId,
                  role: 'bot',
                  content: `If you don't feel ${feelingAnswers.feeling_answer1} anymore, you can leave the chat. Wish you a successful day! 😁😁😁`,
                  timestamp: new Date(),
                }
              ],
              updatedAt: new Date(),
              currentStep: session.path === 'feeling' ? 5 : 6,
            };
          }
          return session;
        }));
        setCycleStep(null);
        setIsCycleActive(false);
        setIsTyping(false);
        if (currentSession?.path === 'feeling') {
          setIsFeelingChecked(true);
        } else {
          setIsGoalChecked(true);
        }
      }
    }, 300);
  };

  // Select conversation path (feeling or goal)
  const selectPath = (path: PathType) => {
    if (!currentSessionId) return;

    let nextQuestion = '';
    if (path === 'feeling') {
      nextQuestion = 'How/What are you feeling right now?';
    } else if (path === 'goal') {
      nextQuestion = 'What is your goal?';
    }

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          path,
          currentStep: 1,
          messages: [
            ...session.messages,
            {
              id: Date.now().toString(),
              role: 'bot',
              content: nextQuestion,
              timestamp: new Date(),
            }
          ],
          updatedAt: new Date(),
        };
      }
      return session;
    }));
  };

  const sendMessage = (content: string) => {
    if (!currentSessionId || !currentSession) return;

    // Add user message
    const userMessageId = Date.now().toString();
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [
            ...session.messages,
            {
              id: userMessageId,
              role: 'user',
              content,
              timestamp: new Date(),
            }
          ],
          updatedAt: new Date(),
        };
      }
      return session;
    }));

    // Show typing indicator
    setIsTyping(true);

    setTimeout(() => {
      const path = currentSession.path;
      const step = currentSession.currentStep || 0;
      
      let botResponse = '';
      let newStep = step;
      
      // Process the response based on initial selection
      if (step === 0) {
        if (content.toLowerCase().includes('feel') || content === '1') {
          selectPath('feeling');
          setIsTyping(false);
          return;
        } else if (content.toLowerCase().includes('goal') || content === '2') {
          selectPath('goal');
          setIsTyping(false);
          return;
        } else {
          botResponse = "I didn't understand. Please choose either 'How you feel' or 'Start with a goal'.";
        }
      } 
      // Process feelings path
      else if (path === 'feeling') {
        switch (step) {
          case 1: // After user shares what they're feeling
            botResponse = `Feel ${content} — what does ${content} feel like?`;
            newStep = 2;
            setFeelingAnswers(prev => ({ ...prev, feeling_answer1: content }));
            break;
          case 2: // After user describes what the feeling feels like
            botResponse = "What would the opposite of that feel like? How do you want to feel?";
            newStep = 3;
            setFeelingAnswers(prev => ({ ...prev, feeling_answer2: content }));
            break;
          case 3: // After user shares how they're feeling now
            botResponse = `Where and how do you feel ${content} now?`;
            newStep = 4;
            setFeelingAnswers(prev => ({ ...prev, feeling_answer3: content }));
            break;
          case 4: // After user shares how they want to feel
            botResponse = `What would it feel like be ${feelingAnswers.feeling_answer3}?`;
            newStep = 5;
            setFeelingAnswers(prev => ({ ...prev, feeling_answer4: content }));
            break;
          case 5: // Final response based on their feelings
            console.log('isFeelingChecked------------------------>', isFeelingChecked);
            if (isFeelingChecked) {
              setTimeout(() => {
                createNewSession();
              }, 300);
            } else if (cycleRepeat === 0) {
              botResponse = "OK, let's check your feelings.";
            } else {
              botResponse = "Please check your feelings again!";
            }
            break;
        }
      } 
      // Process goals path
      else if (path === 'goal') {
        switch (step) {
          case 1: // After user shares their goal
            botResponse = `What would it feel like to ${content}?`;
            newStep = 2;
            setGoalAnswers(prev => ({ ...prev, goal_answer1: content }));
            break;
          case 2: // After user describes what achieving the goal would feel like
            botResponse = `Feel ${content} — what does ${content} feel like?`;
            newStep = 3;
            setGoalAnswers(prev => ({ ...prev, goal_answer2: content }));
            break;
          case 3: // After user describes that feeling
            botResponse = "What would the opposite of that feel like? How do you want to feel?";
            newStep = 4;
            setGoalAnswers(prev => ({ ...prev, goal_answer3: content }));
            break;
          case 4: // After user describes how they're feeling now
            botResponse = `Where and how do you feel ${content} now?`;
            newStep = 5;
            setGoalAnswers(prev => ({ ...prev, goal_answer4: content }));
            break;
          case 5: // After user describes how they want to feel
            botResponse = `What would it feel like to be ${goalAnswers.goal_answer4}?`;
            newStep = 6;
            setGoalAnswers(prev => ({ ...prev, goal_answer5: content }));
            break;
          case 6: // Final response based on their goal
            if (isGoalChecked) {
              setTimeout(() => {
                createNewSession();
              }, 300);
            } else if (cycleRepeat === 0) {
              botResponse = "OK, let's check your feelings.";
            } else {
              botResponse = "Please check your feelings again!";
            }
            break;
        }
      }

      // Add bot response after delay (simulating typing)
      const botMessageId = Date.now().toString();
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            currentStep: newStep,
            messages: [
              ...session.messages,
              {
                id: botMessageId,
                role: 'bot',
                content: botResponse,
                timestamp: new Date(),
              }
            ],
            updatedAt: new Date(),
          };
        }
        return session;
      }));
      
      setIsTyping(false);
    }, 300); 
  };

  const value = {
    sessions,
    currentSessionId,
    currentSession,
    createNewSession,
    switchSession,
    sendMessage,
    selectPath,
    isTyping,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    startCycleCheck,
    isCycleActive,
    handleCycleResponse,
    isFeelingChecked,
    isGoalChecked,
    cycleStep,
    feelingAnswers,
    goalAnswers,
    cycleRepeat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Create a custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
