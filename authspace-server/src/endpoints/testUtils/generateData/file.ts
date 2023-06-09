import {faker} from '@faker-js/faker';
import {first} from 'lodash';
import {File} from '../../../definitions/file';
import {AppResourceType} from '../../../definitions/system';
import {SYSTEM_SESSION_AGENT} from '../../../utils/agent';
import {getTimestamp} from '../../../utils/dateFns';
import {getRandomIntInclusive} from '../../../utils/fns';
import {getNewIdForResource} from '../../../utils/resource';
import {executeWithTxn} from '../../contexts/semantic/utils';
import {BaseContextType} from '../../contexts/types';
import {getFilenameInfo} from '../../files/utils';
import {generateTestFolderName} from './folder';

function removeExtension(name: string) {
  return first(name.split('.'));
}

function addExtenstion(name: string, ext: string) {
  return name + '.' + ext;
}

export function generateTestFileName(
  {includeExtension = true} = {includeExtension: true}
) {
  const seed = getRandomIntInclusive(1, 2);

  if (seed === 1) {
    const extCount = includeExtension ? getRandomIntInclusive(1, 5) : 0;
    return faker.system.fileName({extensionCount: extCount});
  } else {
    const name = generateTestFolderName({separatorChars: ['-', '_', ' ']});
    return includeExtension
      ? addExtenstion(name, faker.system.fileExt())
      : name;
  }
}

export function generateTestFile(
  extra: Partial<File> & {parentId: string | null} = {parentId: null}
) {
  const id = getNewIdForResource(AppResourceType.File);
  const name = generateTestFileName();
  const nameinfo = getFilenameInfo(name);
  const createdAt = getTimestamp();
  const file: File = {
    name,
    createdAt,
    description: faker.lorem.paragraph(),
    mimetype: 'application/octet-stream',
    createdBy: SYSTEM_SESSION_AGENT,
    lastUpdatedAt: createdAt,
    lastUpdatedBy: SYSTEM_SESSION_AGENT,
    idPath: extra.idPath
      ? extra.idPath.concat(id)
      : extra.parentId
      ? [extra.parentId, id]
      : [id],
    namePath: extra.namePath
      ? extra.namePath.concat(nameinfo.nameWithoutExtension)
      : [nameinfo.nameWithoutExtension],
    resourceId: id,
    size: faker.datatype.number({min: 1}),
    workspaceId: getNewIdForResource(AppResourceType.Workspace),
    extension: nameinfo.extension,
    ...extra,
  };

  return file;
}

export function generateTestFiles(
  count = 20,
  extra: Partial<File> & {parentId: string | null} = {parentId: null}
) {
  const files: File[] = [];
  for (let i = 0; i < count; i++) {
    files.push(generateTestFile(extra));
  }
  return files;
}

export async function generateAndInsertTestFiles(
  ctx: BaseContextType,
  count = 20,
  extra: Partial<File> & {parentId: string | null} = {parentId: null}
) {
  const items = generateTestFiles(count, extra);
  await executeWithTxn(ctx, async opts =>
    ctx.semantic.file.insertItem(items, opts)
  );
  return items;
}
