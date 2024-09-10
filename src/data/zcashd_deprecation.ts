import type { Node, Edge } from "@xyflow/react";
import type { DAG, DAGData, Repo, DAGNode, DAGEdge, CEdge } from "@/types/zcashd-deprecation.types";
import { IDS } from "@/types/zcashd-deprecation.types";
const DEFAULT_REPO: Repo = 'librustzcash';

// {
//     "zcash/librustzcash#1411": "Refactor `AccountBalance` to use `Balance` for transparent funds",
//     "zcash/librustzcash#1349": "zcash_client_backend: Required functionality for full `zcashd` wallet replacement.",
//     "zcash/librustzcash#1350": "Determine what subset of zcashd wallet functionality will be required by users in a replacement wallet (independent of how it is accessed)",
//     "zcash/librustzcash#1395": "Enumerate the data that the indexer service needs to provide",
//     "zcash/librustzcash#1369": "Implement the subset of `zcashd` RPCs that expose the decided-upon wallet functionality",
//     "zcash/librustzcash#1335": "Support for multiple accounts",
//     "zcash/librustzcash#1410": "zcash_client_backend: Introduce \"chain access API\" to the sync engine",
//     "zcash/librustzcash#1351": "Wrap the `zcash_client_backend` sync engine as a stateful wallet service application.",
//     "zcash/librustzcash#1364": "Consider whether we provide drop-in support for at least some `zcashd` RPC APIs.",
//     "zcash/zips#821": "Define a standard wallet export format.",
//     "zcash/librustzcash#1365": "Add the functionality to restore from `zcashd` wallet.dat or wallet dump files.",
//     "zcash/librustzcash#1414": "zcash_client_backend: Create the framework for an in-memory wallet backend",
//     "zcash/librustzcash#1415": "zcash_client_backend: Implement internals of in-memory wallet by migrating tests from `zcash_client_sqlite`",
//     "zcash/librustzcash#1353": "zcash_client_backend: If a seed is reused, transparent UTXO spends from one wallet may not be detected in the other.",
//     "zcash/librustzcash#578": "Survey key storage and usage of `zcashd` and `zcash_client_sqlite`",
//     "zcash/librustzcash#1371": "Create structures for storing broader kinds of transparent spending key material",
//     "zcash/librustzcash#1348": "zcash_client_backend: Add the ability to restore from `zcashd` seed phrases.",
//     "zcash/librustzcash#579": "Redesign Rust types for representing wallet key material",
//     "zcash/librustzcash#1370": "Make it possible to construct proposals that spend stored transparent funds (P2PKH and P2SH)",
//     "zcash/librustzcash#1362": "Create a generator and evaluator for arbitrary transparent Zcash script.",
//     "zcash/librustzcash#1360": "Transaction builder support for spending (almost) arbitrary transparent inputs.",
//     "zcash/librustzcash#1368": "zcash_client_backend: Introduce (initially internal) \"sync API\" between the scanning and wallet parts of `scan_cached_blocks`",
//     "zcash/librustzcash#1188": "`zcash_client_backend`: Support import of seed phrases from transparent- only wallets.",
//     "zcash/zcash#6873": "Enumerate the data / state that needs to be migrated from `wallet.dat` to a future full node wallet",
//     "zcash/zcash#5796": "Add ability to restore the zcashd wallet from the emergency recovery phrase (mnemonic seed).",
//     "zcash/librustzcash#1361": "`zcash_client_backend`: Add support for full transparent coin tracking (P2PKH and P2SH)",
//     "zcash/zcash#4099": "Investigate the distribution of P2SH scripts",
//     "zcash/librustzcash#1367": "Create a \"feathered\" wrapper around `shardtree` to enable tracking witnesses for multiple candidate chains",
//     "zcash/librustzcash#1366": "Enable wallets build with the `zcash_client_backend` APIs to track multiple candidate chain tips",
//     "zcash/librustzcash#1373": "Agree on a sketch of the overall wallet architecture",
//     "zcash/librustzcash#1379": "`zcash_client_backend`: Add support for full P2PKH history tracking",
//     "zcash/librustzcash#1074": "Transparent input details should be retrieved with transactions on account recovery",
//     "zcash/librustzcash#1412": "Migrate test framework from `zcash_client_sqlite` to `zcash_client_backend`",
//     "zcash/librustzcash#1363": "Enumerate the capabilities exposed by zcashd APIs for spending transparent coins.",
//     "zcash/librustzcash#1372": "`zcash_primitives::legacy `: Enhance transparent `Script` support as necessary",
//     "zcash/librustzcash#1381": "zcash_primitives: Rework the transparent bundle builder to be more like the shielded bundle builders",
//     "zcash/zips#675": "[ZIP 332] Wallet Recovery from zcashd HD Seeds",
//     "zcash/zcash#6453": "Provide a wallet upgrade path that moves funds held by legacy keys into a unified account."
// }

const nodes: Record<IDS, DAGNode> = {
    [IDS.I_1363]: { description: 'Enumerate the capabilities exposed by zcashd APIs for spending transparent coins.' },
    [IDS.I_1350]: { description: 'Determine what subset of zcashd wallet functionality will be required by users in a replacement wallet (independent of how it is accessed)' },
    [IDS.I_1412]: { description: 'Migrate test framework from zcash_client_sqlite to zcash_client_backend' },
    [IDS.I_1414]: { description: 'zcash_client_backend: Create the framework for an in-memory wallet backend', repo: 'zcash' },
    [IDS.I_1373]: { description: 'Agree on a sketch of the overall wallet architecture' },
    [IDS.I_1335]: { description: 'Support for multiple accounts' },
    [IDS.I_1415]: { description: 'Implement internals of in-memory wallet by migrating tests from "zcash_client_sqlite"' },
    [IDS.I_1395]: { description: 'Enumerate the data that the indexer service needs to provide' },
    [IDS.I_1367]: { description: 'Create a "feathered" wrapper around `shardtree` to enable tracking witnesses for multiple candidate chains' },
    [IDS.I_1410]: { description: 'zcash_client_backend: Introduce "chain access API" to the sync engine' },
    [IDS.I_4099]: { description: 'Investigate the distribution of P2SH scripts', repo: 'zcash' },
    [IDS.I_1372]: { description: '`zcash_primitives::legacy `: Enhance transparent `Script` support as necessary' },
    [IDS.I_1368]: { description: 'zcash_client_backend: Introduce (initially internal) "sync API" between the scanning and wallet parts of `scan_cached_blocks`' },
    [IDS.I_1366]: { description: 'Enable wallets build with the `zcash_client_backend` APIs to track multiple candidate chain tips' },
    [IDS.I_1351]: { description: 'Wrap the `zcash_client_backend` sync engine as a stateful wallet service application.' },
    [IDS.I_1381]: { description: 'zcash_primitives: Rework the transparent bundle builder to be more like the shielded bundle builders' },
    [IDS.I_1362]: { description: 'Create a generator and evaluator for arbitrary transparent Zcash script.' },
    [IDS.I_1379]: { description: '`zcash_client_backend`: Add support for full P2PKH history tracking' },
    [IDS.I_578]: { description: 'Survey key storage and usage of `zcashd` and `zcash_client_sqlite`' },
    [IDS.I_1188]: { description: '`zcash_client_backend`: Support import of seed phrases from transparent- only wallets.' },
    [IDS.I_675]: { description: '[ZIP 332] Wallet Recovery from zcashd HD Seeds', repo: 'zips' },
    [IDS.I_6873]: { description: 'Enumerate the data / state that needs to be migrated from `wallet.dat` to a future full node wallet', repo: 'zcash' },
    [IDS.I_1364]: { description: 'Consider whether we provide drop-in support for at least some `zcashd` RPC APIs.' },
    [IDS.I_1360]: { description: 'Transaction builder support for spending (almost) arbitrary transparent inputs.' },
    [IDS.I_1371]: { description: 'Create structures for storing broader kinds of transparent spending key material' },
    [IDS.I_1361]: { description: '`zcash_client_backend`: Add support for full transparent coin tracking (P2PKH and P2SH)' },
    [IDS.I_1348]: { description: 'zcash_client_backend: Add the ability to restore from `zcashd` seed phrases.' },
    [IDS.I_5796]: { description: 'Add ability to restore the zcashd wallet from the emergency recovery phrase (mnemonic seed).', repo: 'zcash' },
    [IDS.I_6453]: { description: 'Provide a wallet upgrade path that moves funds held by legacy keys into a unified account.', repo: 'zcash' },
    [IDS.I_821]: { description: 'Define a standard wallet export format.', repo: 'zips' },
    [IDS.I_1411]: { description: 'Refactor `AccountBalance` to use `Balance` for transparent funds' },
    [IDS.I_1369]: { description: 'Implement the subset of `zcashd` RPCs that expose the decided-upon wallet functionality' },
    [IDS.I_1370]: { description: 'Make it possible to construct proposals that spend stored transparent funds (P2PKH and P2SH)' },
    [IDS.I_1353]: { description: 'zcash_client_backend: If a seed is reused, transparent UTXO spends from one wallet may not be detected in the other.' },
    [IDS.I_579]: { description: 'Redesign Rust types for representing wallet key material' },
    [IDS.I_1365]: { description: 'Add the functionality to restore from `zcashd` wallet.dat or wallet dump files.' },
    [IDS.I_1074]: { description: 'Transparent input details should be retrieved with transactions on account recovery' },
    [IDS.I_1349]: { description: 'zcash_client_backend: Required functionality for full `zcashd` wallet replacement.' },
}

const edges: CEdge[] = [
    {
        "source": IDS.I_1411,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1350,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1350,
        "target": IDS.I_1395
    },
    {
        "source": IDS.I_1350,
        "target": IDS.I_1369
    },
    {
        "source": IDS.I_1350,
        "target": IDS.I_1335
    },
    {
        "source": IDS.I_1395,
        "target": IDS.I_1410
    },
    {
        "source": IDS.I_1369,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1335,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1410,
        "target": IDS.I_1351
    },
    {
        "source": IDS.I_1351,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1351,
        "target": IDS.I_1364
    },
    {
        "source": IDS.I_821,
        "target": IDS.I_1365
    },
    {
        "source": IDS.I_1365,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1414,
        "target": IDS.I_1415
    },
    {
        "source": IDS.I_1415,
        "target": IDS.I_1410
    },
    {
        "source": IDS.I_1353,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_578,
        "target": IDS.I_1371
    },
    {
        "source": IDS.I_578,
        "target": IDS.I_1348
    },
    {
        "source": IDS.I_578,
        "target": IDS.I_579
    },
    {
        "source": IDS.I_1371,
        "target": IDS.I_1370
    },
    {
        "source": IDS.I_1348,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_579,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1370,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1362,
        "target": IDS.I_1371
    },
    {
        "source": IDS.I_1362,
        "target": IDS.I_1360
    },
    {
        "source": IDS.I_1360,
        "target": IDS.I_1370
    },
    {
        "source": IDS.I_1368,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1188,
        "target": IDS.I_1348
    },
    {
        "source": IDS.I_6873,
        "target": IDS.I_821
    },
    {
        "source": IDS.I_1364,
        "target": IDS.I_1369
    },
    {
        "source": IDS.I_1361,
        "target": IDS.I_1370
    },
    {
        "source": IDS.I_4099,
        "target": IDS.I_1362
    },
    {
        "source": IDS.I_4099,
        "target": IDS.I_1360
    },
    {
        "source": IDS.I_1367,
        "target": IDS.I_1366
    },
    {
        "source": IDS.I_1366,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1373,
        "target": IDS.I_1395
    },
    {
        "source": IDS.I_1373,
        "target": IDS.I_1368
    },
    {
        "source": IDS.I_1373,
        "target": IDS.I_1367
    },
    {
        "source": IDS.I_1373,
        "target": IDS.I_1379
    },
    {
        "source": IDS.I_1379,
        "target": IDS.I_1353
    },
    {
        "source": IDS.I_1379,
        "target": IDS.I_1361
    },
    {
        "source": IDS.I_1074,
        "target": IDS.I_1349
    },
    {
        "source": IDS.I_1412,
        "target": IDS.I_1415
    },
    {
        "source": IDS.I_1363,
        "target": IDS.I_1350
    },
    {
        "source": IDS.I_1363,
        "target": IDS.I_1362
    },
    {
        "source": IDS.I_1363,
        "target": IDS.I_1360
    },
    {
        "source": IDS.I_1363,
        "target": IDS.I_1364
    },
    {
        "source": IDS.I_1372,
        "target": IDS.I_1371
    },
    {
        "source": IDS.I_1372,
        "target": IDS.I_1362
    },
    {
        "source": IDS.I_1381,
        "target": IDS.I_1360
    },
    {
        "source": IDS.I_675,
        "target": IDS.I_1348
    },
    {
        "source": IDS.I_675,
        "target": IDS.I_5796
    },
    {
        "source": IDS.I_675,
        "target": IDS.I_6453
    }
]

const enrichedNodes: Node[] = Object.entries(nodes).map(([key, value]) => {
        console.log(key, value);
        const clave = key.split('_')[1];
        const repo = value.repo ? value.repo : DEFAULT_REPO;
        const label = `${repo}#${clave}`;
        const description = value.description;
        const kb_url = `https://zingo-wiki.vercel.app/issues/I${clave}`; 
        const gh_issue_url = `https://github.com/zcash/${repo}/issues/${clave}`;
        const status = value.status ?? 'open';
        return {
            id: key.toString(),
            position: { x: 0, y: 0 },
            data: {
                label,
                description,
                kb_url,
                gh_issue_url,
                status,
             }
        } 
    });

const enrichedEdges: Edge[] = edges.map((edge) => ({ source: edge.source.toString(), target: edge.target.toString(), id: `${edge.source}-${edge.target}` })); 

export default {
    nodes: enrichedNodes,
    edges: enrichedEdges,
}
