import {
    CacheManager,
    AccountEntity,
    IdTokenEntity,
    AccessTokenEntity,
    RefreshTokenEntity,
    AppMetadataEntity,
    ServerTelemetryEntity,
    ThrottlingEntity,
    CredentialEntity,
    CredentialType
} from "@azure/msal-common";

export class TestStorageManager extends CacheManager {
    store = {};

    // Accounts
    getAccount(key: string): AccountEntity | null {
        const account: AccountEntity = this.store[key] as AccountEntity;
        if (AccountEntity.isAccountEntity(account)) {
            return account;
        }
        return null;
    }

    setAccount(account: AccountEntity): void {
        const key = account.generateAccountKey();
        this.store[key] = account;
    }

    // Credentials (idtokens)
    getIdTokenCredential(key: string): IdTokenEntity | null {
        const credType = CredentialEntity.getCredentialType(key);
        if (credType === CredentialType.ID_TOKEN) {
            return this.store[key] as IdTokenEntity;
        }
        return null;
    }

    setIdTokenCredential(idToken: IdTokenEntity): void {
        const idTokenKey = idToken.generateCredentialKey();
        this.store[idTokenKey] = idToken;
    }

    // Credentials (accesstokens)
    getAccessTokenCredential(key: string): AccessTokenEntity | null {
        const credType = CredentialEntity.getCredentialType(key);
        if (credType === CredentialType.ACCESS_TOKEN) {
            return this.store[key] as AccessTokenEntity;
        }
        return null;
    }

    setAccessTokenCredential(accessToken: AccessTokenEntity): void {
        const accessTokenKey = accessToken.generateCredentialKey();
        this.store[accessTokenKey] = accessToken;
    }

    // Credentials (accesstokens)
    getRefreshTokenCredential(key: string): RefreshTokenEntity | null {
        const credType = CredentialEntity.getCredentialType(key);
        if (credType === CredentialType.REFRESH_TOKEN) {
            return this.store[key] as RefreshTokenEntity;
        }
        return null;
    }
    setRefreshTokenCredential(refreshToken: RefreshTokenEntity): void {
        const refreshTokenKey = refreshToken.generateCredentialKey();
        this.store[refreshTokenKey] = refreshToken;
    }

    // AppMetadata
    getAppMetadata(key: string): AppMetadataEntity | null {
        return this.store[key] as AppMetadataEntity;
    }
    setAppMetadata(appMetadata: AppMetadataEntity): void {
        const appMetadataKey = appMetadata.generateAppMetadataKey();
        this.store[appMetadataKey] = appMetadata;
    }

    // Telemetry cache
    getServerTelemetry(key: string): ServerTelemetryEntity | null {
        return this.store[key] as ServerTelemetryEntity;
    }
    setServerTelemetry(key: string, value: ServerTelemetryEntity): void {
        this.store[key] = value;
    }

    // Throttling cache
    getThrottlingCache(key: string): ThrottlingEntity | null {
        return this.store[key] as ThrottlingEntity;
    }
    setThrottlingCache(key: string, value: ThrottlingEntity): void {
        this.store[key] = value;
    }

    removeItem(key: string): boolean {
        let result: boolean = false;
        if (!!this.store[key]) {
            delete this.store[key];
            result = true;
        }
        return result;
    }
    containsKey(key: string): boolean {
        return !!this.store[key];
    }
    getKeys(): string[] {
        return Object.keys(this.store);
    }
    clear(): void {
        this.store = {};
    }
}
