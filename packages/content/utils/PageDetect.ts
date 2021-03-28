import select from 'select-dom';
import { isRepo, utils } from 'github-url-detection';

export const isHistoryForFile = () => isRepo() && /^\/commits\/[0-9a-f]{5,40}\/.+/.test(utils.getRepoPath());

/**
 * BitBucket related detections
 */
export const isBitBucketRepo = () => location.href.indexOf('bitbucket.org/') > 0;

/**
 * GitLab related detections
 */
export const isGitLabRepo = () => select.exists('.tree-content-holder');

/**
 * Pastebin related detections
 */
export const isPastebinUserList = () =>
  location.href.indexOf('pastebin.com/u/') > 0 && select.exists('table.maintable');

export const isPasteOpen = () => select.exists('#code_frame2');

/**
 * SourceForge related detections
 */
export const isSourceForgeFiles = () => select.exists('#files_list');
