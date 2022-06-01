import { FLOW } from '../Facetec';

/**
 * @param id идентификатор операции operation_id
 * @param session идентификатор сесии FaceTec: sessionToken
 * @param partner зашифрованный идентификатор партнера partner_key
 */
export type TConfigGetProps = Record<'id' | 'session' | 'partner', string>;

export type TPaths = Record<
  'getConfig' | 'operation' | 'facetecSDK',
  string
> & {
  auditTrail?: string;
};

type TReceivedPaths = Record<
  'base_url' | 'enrollment_path' | 'id_scan_path',
  string
>;

export type TConfigPaths = TPaths & TReceivedPaths;

export type TConfigProps = Record<
  'ProductionKey' | 'DeviceKeyIdentifier' | 'PublicFaceScanEncryptionKey',
  string
> &
  TConfigGetProps & {
    flow: FLOW;
    paths: TConfigPaths;
  };

export type TOperationData = Record<
  'description' | 'operation_id' | 'operation_url',
  string
> & {
  result: number;
};

export type TInitializeFromAutogeneratedConfigCallback = (
  initializedSuccessfully: boolean
) => void;

export type TGetConfigProps = Record<
  'production_key' | 'ssh_public_key' | 'device_key' | 'session_path',
  string
> &
  TReceivedPaths & {
    session_timeout: number;
  };
