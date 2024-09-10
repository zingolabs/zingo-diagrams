export type GhIssueStatus = 'open' | 'working-on' | 'closed';

export type Repo = 'librustzcash' | 'zcash' | 'zips';

export type DAGNode = {
    description?: string;
    kb_url?: string;
    repo?: Repo;
    status?: GhIssueStatus;
    // gh_issue_url?: string;
    // children?: string[];
}

export type DAGEdge = {
    source: string;
    target: string;
}

export type DAG = {
    nodes: DAGNode[];
    edges: DAGEdge[];
}

export type DAGData = {
    nodes: DAGNode[];
    edges: DAGEdge[];
}

export  enum IDS {
    I_1363='I_1363',
    I_1350='I_1350',
    I_1412='I_1412',
    I_1414='I_1414',
    I_1373='I_1373',
    I_1335='I_1335',
    I_1415='I_1415',
    I_1395='I_1395',
    I_1367='I_1367',
    I_1410='I_1410',
    I_4099='I_4099',
    I_1372='I_1372',
    I_1368='I_1368',
    I_1366='I_1366',
    I_1351='I_1351',
    I_1381='I_1381',
    I_1362='I_1362',
    I_1379='I_1379',
    I_578='I_578',
    I_1188='I_1188',
    I_675='I_675',
    I_6873='I_6873',
    I_1364='I_1364',
    I_1360='I_1360',
    I_1371='I_1371',
    I_1361='I_1361',
    I_1348='I_1348',
    I_5796='I_5796',
    I_6453='I_6453',
    I_821='I_821',
    I_1411='I_1411',
    I_1369='I_1369',
    I_1370='I_1370',
    I_1353='I_1353',
    I_579='I_579',
    I_1365='I_1365',
    I_1074='I_1074',
    I_1349='I_1349',
}

export type CEdge = {
    source: IDS;
    target: IDS;
};
