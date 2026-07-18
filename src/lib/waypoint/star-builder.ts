import type { Story } from "./companion-types";
export interface StarAnswer { situation:string; task:string; action:string; result:string; source:string; confirmed:boolean; blank:boolean; }
export function buildStarAnswer(stories: Story[], tags: string[]): StarAnswer {
  const story = stories.find((item) => item.userConfirmed && item.tags.some((tag) => tags.includes(tag)));
  if (!story) return { situation:"", task:"", action:"", result:"", source:"No matching user-confirmed story", confirmed:false, blank:true };
  return { situation:story.situation, task:story.task, action:story.action, result:`${story.result} ${story.measurableOutcome}`.trim(), source:story.source, confirmed:true, blank:false };
}
